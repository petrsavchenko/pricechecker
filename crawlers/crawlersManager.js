// Crowling
const needle = require('needle');
const cheerio = require('cheerio');

const User = require('../models/user');
const Crawler = require('../models/crawler');

class CrawlersManager {

    constructor() {
        this.crawlerTimerDictionary = [];
    }

    startAll () {
        var me = this;
        Crawler.find({/* status: { $ne: "Achieved" } */}).then(crawlers => {
                crawlers.forEach(function(crawler){
                    me.start(crawler);
                });                
            })
            .catch(err => {
                throw new Error(err);
            })
    }

    start (crawler) {
        var me = this;
        var checkInterval = process.env.PRICECHECKINTERVAL || 10000;
        if (this.crawlerTimerDictionary[crawler.id]) {
            throw new Error("The crawler is being processed");
        }
        var timerId = setInterval(function() {
            console.log('Started crawling of ' + crawler.url);
            me._checkPrice(crawler)
        }, checkInterval);

        this.crawlerTimerDictionary[crawler.id] = timerId;
    }

    stop (crawler) {
        var timerId = this.crawlerTimerDictionary[crawler.id];
        clearInterval(timerId);

        delete this.crawlerTimerDictionary[crawler.id];
        console.log('Crawling of ' + crawler.url + ' has been stopped');
    }

    _checkPrice(crawler) {
        var me = this;
        if (!crawler) {
            throw new Error("Crawler obj cannot be null");
        }
        try {
            needle.get(crawler.url, function(err, res) {
                if (err) throw err;
        
                var $ = cheerio.load(res.body);
                var priceText = $("#priceblock_ourprice").text();
    
                var price = parseFloat(priceText.replace('$',''));
                if (isNaN(price)) {
                    console.log("invalid format of price " + priceText);
                } else {
                    console.log('Price is ' + price);
                    if(price <= crawler.desiredPrice) {
                        me._sendEmail(crawler, price);
                        me._markAsArchieved(crawler._id);
                    }
                }
                console.log('Finished crawling of ' + crawler.url);
            });
        } catch (error) {
            console.log(error);            
        }
        
    }

    _sendEmail(crawler, realtimePrice) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'petek.h2o@gmail.com',
                pass: 'gtnh5512'
            }
        });

        User.findById(crawler.userId)
			.then(user => {

				if (!user) {
                    throw new Error("User was not found")
                }
                
                var mailOptions = {
                    from: 'petek.h2o@gmail.com',
                    to: 'petr.savchenko@hotmail.com',
                    subject: 'Price notification about ' + crawler.url,
                    html: `Hey ${user.name.firstName}</br>
                        Your desired price was $${crawler.desiredPrice}</br>
                        Real time price is $${realtimePrice}`
                };
        
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });


			}).catch(err => {
				throw new Error(err);
			})
    }

    _markAsArchieved(crawlerId) {
        Crawler.update({ _id: crawlerId }, { status : "Achieved" })
            .then(crawler => {

                if (!crawler) {
                    throw new Error ("crawler was not found")
                }

            })
            .catch(err => {
                throw new Error (err);
            })

    }
}

module.exports = new CrawlersManager();
// Crowling
const needle = require('needle');
const cheerio = require('cheerio');
const winston = require('winston');

const User = require('../models/user');
const Crawler = require('../models/crawler');

/**
 * Config
 */
const config = require('../config');

class CrawlersManager {

    constructor() {
        this.crawlerTimerDictionary = [];
    }

    startAll () {
        var me = this;
        Crawler.find({ status: { $ne: "Achieved" } })
            .then(crawlers => {
                crawlers.forEach(crawler => me.start(crawler));   
            })
            .catch(err => winston.error(`Error on Crawler.find`, err))
    }

    start (crawler) {
        var me = this;
        var checkInterval = config.pricecheckingInverval;
        if (this.crawlerTimerDictionary[crawler.id]) {
            winston.error(`The crawler id: ${crawler.id} has been being processed`);
            return;
        }
        var timerId = setInterval(function() {
            winston.info(`Started crawling id: ${crawler.id} of ${crawler.url}`);
            me._checkPrice(crawler);
        }, checkInterval);

        this.crawlerTimerDictionary[crawler.id] = timerId;
    }

    stop (crawler) {
        if (!crawler) {
            winston.error('Crawler obj cannot be null');
            return;
        }
        var timerId = this.crawlerTimerDictionary[crawler.id];
        if (!timerId){
            winston.error(`The crawler id: ${crawler.id} is not being processed`);
            return;
        }

        clearInterval(timerId);
        delete this.crawlerTimerDictionary[crawler.id];
        winston.info(`Crawling of ${crawler.url} id: ${crawler.id} has been stopped`);
    }

    _checkPrice (crawler) {
        var me = this;
        if (!crawler) {
            winston.error('Crawler obj cannot be null');
            return;
        }
        try {
            needle('get', crawler.url)
                .then(res => {
                    var $ = cheerio.load(res.body);
                    var priceText = $("#priceblock_ourprice").text();
        
                    var price = parseFloat(priceText.replace('$',''));
                    if (isNaN(price)) {
                        winston.warn("invalid format of price " + priceText);
                    } else {
                        winston.info('Price is ' + price);
                        if(price <= crawler.desiredPrice) {
                            me._sendEmail(crawler, price);
                            me._markAsArchieved(crawler._id);
                            me.stop(crawler);
                        }
                    }
                    winston.info('Finished crawling of ' + crawler.url);
                })
                .catch(err => winston.error(`Error during get request to ${crawler.url}`, err))
        } catch (error) {
            winston.error(`Error during get request to ${crawler.url}`, err);        
        }        
    }

    _sendEmail(crawler, realtimePrice) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'petrsavchenkooo@gmail.com',
              pass: '3pyuQhLJ5k'
            }
        });

        console.log(`Start sending email to ${crawler.userId}`);

        User.findById(crawler.userId)
			.then(user => {

				if (!user) {
                    winston.error('User was not found');
                }
                
                var mailOptions = {
                    from: 'petrsavchenkooo@gmail.com',
                    to: user.email,
                    subject: 'Price notification about ' + crawler.url,
                    html: `Hey ${user.name.first}</br>
                        Your desired price was $${crawler.desiredPrice}</br>
                        Real time price is $${realtimePrice}`
                };

                console.log(`Ready to send email to ${user.email}`);
        
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(`Error during sending email ${error}`);
                        winston.error('Error during sending email', error);
                    } else {
                        winston.info(`Email sent: ${ info.response}. CrawlerId: ${crawler.id}. Real time price: ${realtimePrice}`);
                        console.log(`Email sent: ${ info.response}. CrawlerId: ${crawler.id}. Real time price: ${realtimePrice}`);
                    }
                });


			}).catch(err => {
				winston.error('Error on User.findById', err);
			})
    }

    _markAsArchieved(crawlerId) {
        Crawler.update({ _id: crawlerId }, { status : "Achieved" })
            .then(crawler => {

                if (!crawler) {
                    winston.error('Crawler was not found');
                }

            })
            .catch(err => {
                winston.error('Error on Crawler.update', err);
            })

    }
}

module.exports = new CrawlersManager();
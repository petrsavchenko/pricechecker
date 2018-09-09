// Crowling
const needle = require('needle');
const cheerio = require('cheerio');

// const User = require('../models/user');
const Crawler = require('../models/crawler');

class CrawlersManager {

    constructor() {
        this.crawlerTimerDictionary = [];
    }

    startAll () {
        var me = this;
        Crawler.find({ status: { $ne: "Achieved" }}).then(crawlers => {
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
        if (this.crawlerTimerDictionary[crawler.id]){
            throw new Error("The crawler is being processed");
        }
        var timerId = setInterval(function() {
            console.log('Started crawling of ' + crawler.url);
            me._checkPrice(crawler.url, crawler.desiredPrice)
            console.log('Finished crawling of ' + crawler.url);
        }, checkInterval);

        this.crawlerTimerDictionary[crawler.id] = timerId;
    }

    stop (crawler) {
        var timerId = this.crawlerTimerDictionary[crawler.id];
        clearInterval(timerId);

        delete this.crawlerTimerDictionary[crawler.id];
        console.log('Crawling of ' + crawler.url + ' has been stopped');
    }

    _checkPrice(url, desiredPrice) {   
        needle.get(url, function(err, res) {
            if (err) throw err;
    
            var $ = cheerio.load(res.body);
            var priceText = $("#priceblock_ourprice").text();

            var price = parseFloat(priceText.replace('$',''));
            if (isNaN(price)) {
                console.log("invalid format of price " + priceText);
            } else {
                console.log('Price is ' + price);
                if(price <= desiredPrice) {
                    //notify user
                    //change crawler state to finished
                }
            }         
        });
    }
}

module.exports = new CrawlersManager();

// app.get('/api/test', (req, result) => {
//     const URL = 'https://www.amazon.com/Atlin-Tumbler-Double-Stainless-Insulation/dp/B074XMH3W2';
//     let price = 0;

//     needle.get(URL, function(err, res){
//       if (err) throw err;

//       var $ = cheerio.load(res.body);

//       price = $("#priceblock_ourprice").text();
//       // console.log(price);
//       result.send({ price: price });
//     });
// });
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.nytimes.com", function (error, response, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $(".theme-summary").each(function (i, element) {

            var header = $(this).children(".story-heading").text().trim();
            var summary = $(this).children(".summary").text().trim();

            if (header && summary) {

                var headerClean = header.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summaryClean = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd ={
                    headline: headerClean,
                    summary: summaryClean
                };
                articles.push(dataToAdd)
            }
           
        })
        cb(articles);
    })
};

module.exports = scrape;
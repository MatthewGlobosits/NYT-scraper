var request = require("request");
var cheerio = require("cheerio")

var scrape = function (cb) {

    request("http://www.nytimes.com", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];


        $(".css-8atqhb").each(function (i, elemment) {
            var head = $(this).children(".css-1cmu9py").text().trim();
            var sum = $(this).children(".css-1pfq5u").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        console.log("found this ", body)
        cb(articles);
        
    });
};

module.exports = scrape;
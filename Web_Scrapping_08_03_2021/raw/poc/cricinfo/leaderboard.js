let request = require("request");
let cheerio = require("cheerio");
let extractor = require("./singleMatchDetails");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url,cb);

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let matches = chSelector(".col-md-8.col-16");
    console.log(matches.length);
    for (let i = 0;i < matches.length;i++) {
        let allAnchorOfMatch = chSelector(matches[i]).find(".match-cta-container .btn.btn-sm.btn-outline-dark.match-cta");
        let url = chSelector(allAnchorOfMatch[2]).attr("href");
        let fullUrl = "https://www.espncricinfo.com" + link;
        // console.log(fullUrl);
        extractor.extract(fullUrl);
    }
}
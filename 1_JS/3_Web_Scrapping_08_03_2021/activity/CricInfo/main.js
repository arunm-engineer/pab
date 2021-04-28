let request = require("request");
let cheerio = require("cheerio");
let matchInfo = require("./matchInfo");
let directory = require("./directory");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
directory.createDirectory("ipl");

function viewAllMatches(url) {
    request(url, cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let link = chSelector(".widget-items.cta-link > .label.blue-text.blue-on-hover").attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;
    matchInfo.getMatchDetails(fullLink);
}

viewAllMatches(url);
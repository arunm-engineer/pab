let request = require("request");
let cheerio = require("cheerio");
let scoreCard = require("./scoreCard");

function getMatchDetails(url) {
    request(url, cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let matchBox = chSelector(".match-cta-container");
    for (let i = 0;i < matchBox.length;i++) {
        let scoreCardLinkAnchor = chSelector(matchBox[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let link = chSelector(scoreCardLinkAnchor[2]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        scoreCard.getMatchScoreCardDetails(fullLink);
    }
}

module.exports = {
    getMatchDetails: getMatchDetails
}
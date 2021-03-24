let request = require("request");
let cheerio = require("cheerio");
let issueDetailTool = require("./issueDetails.js");

function processIssues(url, filePath) {
    request(url, cb1);

    function cb1(err, response, html) {
        let chSelector = cheerio.load(html);
        let issuesPage = chSelector(".js-selected-navigation-item.UnderlineNav-item.hx_underlinenav-item.no-wrap.js-responsive-underlinenav-item");
        let issuesPageLink = chSelector(issuesPage[1]).attr("href");
        let issuesPageFullLink = "https://www.github.com" + issuesPageLink;
        issueDetailTool.issueDetailExtractor(issuesPageFullLink, filePath);
    }    
}


module.exports = {
    processIssues: processIssues
}
let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

function issueDetailExtractor(url, filePath) {
    request(url, cb);

    function cb(err, response, html) {
        let chSelector = cheerio.load(html);
        let issuesContainer = chSelector(".js-navigation-container.js-active-navigation-container");
        let allIssues = chSelector(issuesContainer).find(".Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row");
        let issueDetails = [];
        for (let i = 0;i < allIssues.length;i++) {
            let eachIssue = chSelector(allIssues[i]).find(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
            let issueName = chSelector(eachIssue).text().trim();
            let issueLink = chSelector(eachIssue).attr("href");
            let issueFullLink = "https://www.github.com" + issueLink;
            
            issueDetails.push({
                "issueName": issueName,
                "issueLink": issueFullLink
            });
        }
        addIssueDetails(filePath, issueDetails);
        // console.table(issuesArray);
    }
}

function addIssueDetails(filePath, issueDetails) {
    fs.writeFileSync(filePath, JSON.stringify(issueDetails));
}

module.exports = {
    issueDetailExtractor: issueDetailExtractor
}
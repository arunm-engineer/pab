let request = require("request");
let cheerio = require("cheerio");

let url = "https://github.com/Nyr/openvpn-install/issues";
let issuesArray = [];

function issuesExtractor(url) {
    request(url, cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let issuesContainer = chSelector(".js-navigation-container.js-active-navigation-container");
    let allIssues = chSelector(issuesContainer).find(".Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row");
    
    for (let i = 0;i < allIssues.length;i++) {
        let eachIssue = chSelector(allIssues[i]).find(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let issueName = chSelector(eachIssue).text();
        let issueLink = chSelector(eachIssue).attr("href");
        let issueFullLink = "https://github.com" + issueLink;
        issuesArray.push({
            issueName: issueName,
            issueLink: issueFullLink
        });
    }

    console.log(issuesArray);
}

issuesExtractor(url);
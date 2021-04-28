let fs = require("fs");
let path = require("path");
let request = require("request");
let cheerio = require("cheerio");
let issuesTool = require("./issues.js");

function processRepos(url) {
    request(url, cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let topicName = chSelector(".h1-mktg").text().trim();
    let folderToCreate = path.join(__dirname, topicName);
    dirCreator(folderToCreate);

    let allRepos = chSelector(".border.rounded.color-shadow-small.color-bg-secondary.my-4");
    for (let i = 0;i < 8;i++) {
        let eachRepo = chSelector(allRepos[i]).find(".f3.color-text-secondary.text-normal.lh-condensed a");
        let eachRepoLink = chSelector(eachRepo[1]).attr("href");
        let repoFullLink = "https://www.github.com" + eachRepoLink;
        let fileName = repoFullLink.split("/").pop();
        let fileToCreate = path.join(folderToCreate, fileName + ".json");
        let filePath = fileToCreate;
        fileCreator(fileToCreate);
        issuesTool.processIssues(repoFullLink, filePath);
    }
}

function dirCreator(folderToCreate) {
    if (fs.existsSync(folderToCreate) == false) {
        fs.mkdirSync(folderToCreate);
    }
}
function fileCreator(fileToCreate) {
    if (fs.existsSync(fileToCreate) == false) {
        fs.openSync(fileToCreate,"w");
    }
}

module.exports = {
    processRepos: processRepos
}
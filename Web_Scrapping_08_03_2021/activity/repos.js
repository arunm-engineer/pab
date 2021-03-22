let request = require("request");
let cheerio = require("cheerio");

let url = "https://github.com/topics/ubuntu";

function topicsExtractor(url, path, folderName) {
    request(url, cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let allRepos = chSelector(".border.rounded.color-shadow-small.color-bg-secondary.my-4");
    // console.log(allRepos.length);
    for (let i = 0;i < 8;i++) {
        let eachRepo = chSelector(allRepos[i]).find(".f3.color-text-secondary.text-normal.lh-condensed").find("a");
        let eachRepoLink = chSelector(eachRepo[1]).attr("href");
        // console.log(eachRepoLink);
        let repoFullLink = "https://github.com" + eachRepoLink;
        console.log(repoFullLink);
    }
}

topicsFolder(url);
let request = require("request");
let cheerio = require("cheerio");

let url = "https://github.com/topics";

request(url, cb);

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let allTopics = chSelector(".col-12.col-sm-6.col-md-4.mb-4");
    // console.log(allTopics.length);
    for (let i = 0;i < allTopics.length;i++) {
        let eachTopicLink = chSelector(allTopics[i]).find(".no-underline.d-flex.flex-column.flex-justify-center").attr("href");
        let fullLink = "https://github.com" + eachTopicLink;
        // console.log(__dirname);
        console.log(fullLink);
        // let topicName = chSelector(eachTopic).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1").text().trim();
        // console.log(topicName);
    }
}
let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(url,cb);
function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let element = chSelector(".match-comment .d-flex.match-comment-padder.align-items-center .match-comment-long-text p");
    // let text = element.html(); //Automatically gets first element if there are array of elemnts.
    console.log(element.length);
    let text = chSelector(element[0]).text();
    console.log(text);
}
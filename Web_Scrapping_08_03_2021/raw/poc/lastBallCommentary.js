let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

request(url,cb);    //Requests from the given url
function cb(err, response, html) {   //Callback func
    let chSelector = cheerio.load(html);     //Returns data from the given url
    let element = chSelector(".match-comment .d-flex.match-comment-padder.align-items-center .match-comment-long-text p");
    // Returns data according to the matching selectors.
    // let text = element.html(); //Return datain html syntax but in string format. Also Automatically gets first element if there are array of elemnts.
    // console.log(element.length);
    let text = chSelector(element[0]).text();  //Return data in plain text (string) format.
    console.log(text);
}
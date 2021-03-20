let request = require("request");
let cheerio = require("cheerio");

console.log("Before");

request("https://www.google.com",cb);
function cb(err, response, html) {
    let cheerioSelector = cheerio.load(html);
    let element = cheerioSelector("#SIvCob");
    console.log(element.text());
}

console.log("After");
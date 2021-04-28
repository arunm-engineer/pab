const puppeteer = require("puppeteer");

let link = "https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq";
let cTab;

(async function fn() {
    try {
        let browserOpenPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let browser = await browserOpenPromise;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];

        await cTab.goto(link);
        // h1#title 
        await cTab.evaluate()

    } catch (err) {
        console.log(err);
    }
})();
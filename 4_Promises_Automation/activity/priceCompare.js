const puppeteer = require("puppeteer");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com"];
let pName = process.argv[2] + " " + process.argv[3];
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
        
        // let amazonList = await getListingFromAmazon(links[0], pName);
        // console.table(amazonList);
        
        // let flipkartList = await getListingFromFlipkart(links[1], pName);
        // console.table(flipkartList);

        let paytmMallList = await getListingFromPaytmMall(links[2], pName);
        console.table(paytmMallList);

    } catch (err) {
        console.log(err);
    }
})();
async function getListingFromAmazon(link, pName) {
    // console.log(pName)
    // #twotabsearchtextbox
    // #nav-search-submit-button
    // span>div>div.rush-component
    // s-include-content-margin s-border-bottom s-latency-cf-section
    await cTab.goto(link);
    // await cTab.waitForSelector("#twotabsearchtextbox",{visible :true});
    await cTab.type("#twotabsearchtextbox", pName, { delay: 200 });
    await cTab.click("#nav-search-submit-button");
    await cTab.waitForSelector(".a-size-medium.a-color-base.a-text-normal", { visible: true });
    return cTab.evaluate(amazonProductEvalutor, ".a-size-medium.a-color-base.a-text-normal", ".a-price-whole");
}

function amazonProductEvalutor(nameSelector, priceSelector) {
    let nameElems = document.querySelectorAll(nameSelector);
    let priceElems = document.querySelectorAll(priceSelector);
    let amazonListElems = [];
    for (let i = 0; i < 5; i++) {
        let name = nameElems[i].innerText;
        let price = priceElems[i].innerText;
        amazonListElems.push({
            name, price
        })
    }
    return amazonListElems;
}

async function getListingFromFlipkart(link, pName) {
    await cTab.goto(link);
    await cTab.click("._2KpZ6l._2doB4z");
    await cTab.type("._3704LK", pName, {delay : 100});
    await cTab.click(".L0Z3Pu");
    await cTab.waitForSelector("._4rR01T", {visible : true});
    return await cTab.evaluate(flipkartProductEvalutor, "._4rR01T", "._30jeq3._1_WHN1");
}

function flipkartProductEvalutor(nameSelector, priceSelector) {
    let nameElems = document.querySelectorAll(nameSelector);
    let priceElems = document.querySelectorAll(priceSelector);

    let flipkartListElems = [];
    for (let i = 0;i < 5;i++) {
        let name = nameElems[i].innerText;
        let price = priceElems[i].innerText;
        flipkartListElems.push({
            name, price
        });
    }

    return flipkartListElems;
}

async function getListingFromPaytmMall(link, pName) {
    await cTab.goto(link);
    await cTab.type("input[id='searchInput']", pName, {delay : 100})
    await cTab.keyboard.press('Enter');
    return await cTab.evaluate(paytmMallProductEvalutor, "._2i1r a", "._2i1r .pCOS ._1kMS > span");
}

function paytmMallProductEvalutor(nameSelector, priceSelector) {
    let nameElems = document.querySelectorAll(nameSelector);
    // let priceElems = document.querySelectorAll(priceSelector);
    console.log(nameElems[0].innerText);
    // console.log(priceElems);
    let paytmMallListElems = [];
    // for (let i = 0;i < 5;i++) {
    //     console.log('Here no prblm');
    //     let name = nameElems[i].innerText;
    //     console.log('Name error');
    //     let price = priceElems[i].innerText;
    //     console.log('Price error');
    //     paytmMallListElems.push({
    //         name, price
    //     })
    // }

    return paytmMallListElems;
}
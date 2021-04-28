const puppeteer = require("puppeteer");
let PDFDocument = require('pdfkit');
let fs = require('fs');

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
        
        let pdfContent = "";

        let amazonList = await getListingFromAmazon(links[0], pName);
        pdfContent += JSON.stringify(amazonList) + "\n\n";
        // console.table(amazonList);
        
        let flipkartList = await getListingFromFlipkart(links[1], pName);
        pdfContent += JSON.stringify(flipkartList) + "\n\n";
        // console.table(flipkartList);

        let paytmMallList = await getListingFromPaytmMall(links[2], pName);
        pdfContent += JSON.stringify(paytmMallList) + "\n\n";
        // console.table(paytmMallList);

        writeInPDFFile(pdfContent);

    } catch (err) {
        console.log(err);
    }
})();

async function getListingFromAmazon(link, pName) {
    await cTab.goto(link);  //Initially you don't have to waitForSelector because the browser page by default waits for the page to load.
    await cTab.type("#twotabsearchtextbox", pName, { delay: 200 });
    await cTab.click("#nav-search-submit-button");
    await cTab.waitForSelector(".a-size-medium.a-color-base.a-text-normal", { visible: true });
    return await cTab.evaluate(amazonProductEvaluator,
        ".s-include-content-margin.s-border-bottom.s-latency-cf-section",
        ".aok-inline-block.s-sponsored-label-info-icon",
        ".a-size-medium.a-color-base.a-text-normal",
        ".a-price-whole");
}

async function getListingFromFlipkart(link, pName) {
    await cTab.goto(link);
    await cTab.click("._2KpZ6l._2doB4z");
    await cTab.type("._3704LK", pName, {delay : 200});
    await cTab.click(".L0Z3Pu");
    await cTab.waitForSelector("._4rR01T", {visible : true});
    return await cTab.evaluate(ProductEvalutor, "._4rR01T", "._30jeq3._1_WHN1");
}

async function getListingFromPaytmMall(link, pName) {
    await cTab.goto(link);
    await cTab.waitForSelector("input[id='searchInput']", {visible : true});
    await cTab.type("input[id='searchInput']", pName, {delay : 200})
    await cTab.keyboard.press('Enter');
    await cTab.waitForSelector(".UGUy", {visible : true})
    return await cTab.evaluate(ProductEvalutor, ".UGUy", "._1kMS");
}

function ProductEvalutor(nameSelector, priceSelector) {
    let nameElems = document.querySelectorAll(nameSelector);
    let priceElems = document.querySelectorAll(priceSelector);

    let listElems = [];
    for (let i = 0;i < 5;i++) {
        let name = nameElems[i].innerText;
        let price = priceElems[i].innerText;
        listElems.push({
            name, price
        });
    }

    return listElems;
}

function amazonProductEvaluator(blockSelector, sponsoredIdentifier, nameSelector, priceSelector) {

    let allBlocks = document.querySelectorAll(blockSelector);
    let list = [];
    for (let i = 0; i < allBlocks.length; i++) {
        let isSponsored = allBlocks[i].querySelector(sponsoredIdentifier);
        if (isSponsored == null) {
            let nameElem = allBlocks[i].querySelector(nameSelector);
            let priceElem = allBlocks[i].querySelector(priceSelector);
            list.push({
                name: nameElem.innerText,
                price: priceElem.innerText
            }
            )
        }
        if (list.length == 5) {
            return list;
        }
    }
    return list;
}

function writeInPDFFile(content) {
    let pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream('priceComparison.pdf'));
    pdfDoc.text(content);
    pdfDoc.end();
}
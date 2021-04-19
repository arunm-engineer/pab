const puppeteer = require('puppeteer');
let pageLink = 'https://www.geeksforgeeks.org/';
let gPage;
let companyName = 'Thoughtworks';

(async function scrapExperiencs() {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    let browserTabs = await browser.pages();
    gPage = browserTabs[0];
    await getToMainPage();

})();

async function getToMainPage() {
    await gPage.goto(pageLink);

    await waitAndClick('.header-main__list-item');
    await gPage.evaluate(getCompanyList, '.header-main__list-item.selected .mega-dropdown .mega-dropdown__list-item');
    await getToCompanyExperiences('.entry-content .sLiClass a');
}

function getCompanyList(selector) {
    let allItemsArr = Array.from(document.querySelectorAll('.header-main__list-item.selected .mega-dropdown .mega-dropdown__list-item'));

    let filterItemsArr = allItemsArr.filter((element) => {
        let correctSelector = element.innerText.trim().toLowerCase();
        if (correctSelector === 'interview corner' || correctSelector === 'interview experiences') return true;
    });

    filterItemsArr[0].click();
    filterItemsArr[1].querySelector('a').click();
}

async function waitAndClick(selector) {
    await gPage.waitForSelector(selector, { visible: true });
    await gPage.click(selector);
}

async function getToCompanyExperiences(selector) {
    await gPage.waitForSelector(selector, {visible: true});
    await gPage.evaluate(findCompany, selector, companyName);
    // await collectInterviewQuestions('.nextpostslink');
    await collectInterviewQuestions('.articles-list .content .head a', '.nextpostslink');
}

function findCompany(selector, companyToFind) {
    let allCompanySelectors = document.querySelectorAll(selector);
    allCompanySelectors.forEach((element, idx) => {
        let companyInPage = element.innerText.split("[")[0].trim().toLowerCase();
        companyToFind = companyToFind.trim().toLowerCase();
        if (companyInPage === companyToFind) {
            element.click();
        }
    });
}

async function collectInterviewQuestions(postSelector, nextPageSelector) {
    await gPage.waitForSelector(postSelector, {visible: true});
    let postLinks = await gPage.evaluate(traverseAllExperiences, postSelector);
    console.log(postLinks);
    for (let i = 0;i < postLinks.length;i++) {
        await gPage.goto(postLinks[i], {waitUntil: 'domcontentloaded'});
        console.log('Link', i, 'work over');
        await gPage.goBack({waitUntil: 'domcontentloaded'});
    }
    
}

function traverseAllExperiences(postSelector) {
    let allPostArr = document.querySelectorAll(postSelector);
    let allPostLinksArr = [];
    allPostArr.forEach((element, index) => {
        if (element.innerText.includes('Interview Experience')) {
            allPostLinksArr.push(element.getAttribute('href'));
        }
    });
    return allPostLinksArr;
}
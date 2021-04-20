const puppeteer = require('puppeteer');
const help = require('./help.js');
const filter = require('./filter.js');
let pageLink = 'https://www.geeksforgeeks.org/';
let gPage;
let allQuestionDetails;

async function scrapExperiences(location, companyName) {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    let browserTabs = await browser.pages();
    gPage = browserTabs[0];
    await getToMainPage(location, companyName);

}

async function getToMainPage(location, companyName) {
    await gPage.goto(pageLink);

    await waitAndClick('.header-main__list-item');
    await gPage.evaluate(getToCompanyIEListPage, '.header-main__list-item.selected .mega-dropdown .mega-dropdown__list-item');
    let companyIEExists = await checkCompanyIEExists('.entry-content .sLiClass a', companyName);
    if (companyIEExists === true) { //If requested company IE exists or not.
        allQuestionDetails = await collectInterviewQuestions('.articles-list .content .head a', '.nextpostslink');
        filter.filterQuestions(allQuestionDetails, location, companyName);
    }
    else {
        help.helpWithCompany();
    }

}

function getToCompanyIEListPage(selector) {
    let allItemsArr = Array.from(document.querySelectorAll(selector));

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

async function checkCompanyIEExists(selector, companyName) {
    await gPage.waitForSelector(selector, { visible: true });
    let companyExistsInSite = await gPage.evaluate(findCompany, selector, companyName);
    function findCompany(selector, companyToFind) {
        let allCompanySelectors = document.querySelectorAll(selector);
        let companyExists = false;
        allCompanySelectors.forEach((element, idx) => {
            let companyInPage = element.innerText.split("[")[0].trim().toLowerCase();
            companyToFind = companyToFind.trim().toLowerCase();
            if (companyInPage === companyToFind) {
                element.click();
                companyExists = true;
            }
        });
        return companyExists;
    }
    return companyExistsInSite;
}

async function collectInterviewQuestions(postSelector, nextPageSelector) {
    let QuestionsDetails = [];

    await gPage.waitForSelector(postSelector, { visible: true });
    let nextPage = await nextPageSelectorExists(nextPageSelector);

    while (nextPage !== null) {

        await traverseAllIEInPage(postSelector, QuestionsDetails); //To traverse all IE from requested company IE pages

        await Promise.all([
            gPage.waitForNavigation({ waitUntil: 'networkidle0' }),
            gPage.click(nextPageSelector)
        ]);

        nextPage = await nextPageSelectorExists(nextPageSelector);
    }

    await traverseAllIEInPage(postSelector, QuestionsDetails);  //This is to traverse IE of the last page leftover.

    return QuestionsDetails;
}

async function traverseAllIEInPage(postSelector, QuestionsDetails) {
    let allIELinks = await gPage.evaluate(getPageAllIELinks, postSelector);  //Links of all IE in each page 
    for (let i = 0; i < allIELinks.length; i++) {

        await Promise.all([
            await gPage.goto(allIELinks[i], { waitUntil: 'domcontentloaded' }),
            QuestionsDetails.push(
                await gPage.evaluate(() => {

                    if (document.querySelector('.editor-buttons-container') !== null) {  //If it's a diresct question
                        let title = document.querySelector('.a-wrapper .title').innerText;
                        let link = window.location.href; //Gets current page URL in browser
                        return { title, link };
                    }
                    else {  //Else if it's an IE where we collect all questions
                        let IEQuestionsArr = Array.from(document.querySelectorAll('.a-wrapper .text a'));
                        let IEQuestionDetails = [];
                        let isQuestionFactor = true;
                        IEQuestionsArr.forEach((element) => {
                            let title = element.innerText.trim();
                            let link = element.getAttribute('href');
                            if (title.toLowerCase() === 'DSA Self Paced Course'.toLowerCase()) isQuestionFactor = false;
                            if (isQuestionFactor === true) IEQuestionDetails.push({ title, link });
                        });
                        return IEQuestionDetails;
                    }

                })
            ),
            await gPage.goBack({ waitUntil: 'domcontentloaded' })  //waitUntil (option) : domcontentloaded
        ]);

    }

}

function getPageAllIELinks(postSelector) {
    let allIESelectorArr = document.querySelectorAll(postSelector);
    let allIELinksArr = [];
    allIESelectorArr.forEach((element, index) => {
        allIELinksArr.push(element.getAttribute('href'));
    });
    return allIELinksArr;
}

async function nextPageSelectorExists(nextPageSelector) {
    return await gPage.evaluate((selector) => {
        return document.querySelector(selector);
    }, nextPageSelector);
}

module.exports = {
    scrapExperiences: scrapExperiences
}
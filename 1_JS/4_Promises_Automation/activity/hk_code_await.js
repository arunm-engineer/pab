let puppeteer = require("puppeteer");
let email = "niyiji9262@ddwfzp.com";
let password = "some_r@andom_p@ss";
let { answers } = require("./codes.js");
let cTab;

(async function () {
    try {
        let browserOpenP = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let browser = await browserOpenP;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];
        await cTab.goto("https://www.hackerrank.com/auth/login");
        await cTab.type("input[name = \"username\"]", email, { delay: 200 });
        await cTab.type("input[name = \"password\"]", password, { delay: 200 });
        await cTab.click("button[data-analytics=\"LoginPassword\"]");
        await waitAndClickSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        await waitAndClickSelector("a[data-attr1=\"warmup\"]");
        await cTab.waitForSelector("a[data-analytics=\"ChallengeListChallengeName\"]", { visible: true });
        let mainPageURL = await cTab.url();
        for (let i = 0; i < answers.length; i++) {
            let qObj = answers[i];
            await questionSolver(qObj.qName, qObj.soln, mainPageURL);
        }
       
    }
    catch (err) {
        return new Error(err);
    }

})();


async function questionSolver(qName, code, mainPageURL) {

        await cTab.evaluate(matchQuestion, ".challengecard-title", qName);   //This evaluate fn will go and execute in the "browser" and that's the reason you get access to the DOM.
        await cTab.waitForSelector(".ui-icon-label.page-label", { visible: true });
        await waitAndClickSelector(".ui-checkbox.theme-m");
        await cTab.waitForSelector(".input.text-area.custominput.auto-width", { visible: true });
        await cTab.type(".input.text-area.custominput.auto-width", code, { delay: 10 });
        await cTab.keyboard.down("Control");
        await cTab.keyboard.press("a");
        await cTab.keyboard.press("x");
        await cTab.click(".monaco-editor.no-user-select.vs");
        await cTab.keyboard.press("a");
        await cTab.keyboard.press("v");
        await cTab.keyboard.up("Control");
        await cTab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        await cTab.waitForSelector(".ui-icon-label.tab-item-label", { visible: true });
        await cTab.goto(mainPageURL);

}

function matchQuestion(selector, qName) {
    let questionsArr = document.querySelectorAll(selector);
    for (let i = 0; i < questionsArr.length; i++) {
        let questionTitle = questionsArr[i].innerText.split("\n")[0];
        if (qName === questionTitle) {
            return questionsArr[i].click();
        }
    }
}

async function waitAndClickSelector(selector) {
    try {
        await cTab.waitForSelector(selector, { visible: true });
        await cTab.click(selector);
    }
    catch (err) {
        return new Error(err);
    }

}
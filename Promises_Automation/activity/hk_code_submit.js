let puppeteer = require("puppeteer");
let email = "niyiji9262@ddwfzp.com";
let password = "some_r@andom_p@ss";
let {answers} = require("./codes.js");
let cTab;


let browserOpenP = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
});

browserOpenP
    .then(function (browser) {
        let allTabsP = browser.pages();
        return allTabsP;
    })
    .then(function (allTabsArr) {
        cTab = allTabsArr[0];
        let visitLoginPageP = cTab.goto("https://www.hackerrank.com/auth/login");
        return visitLoginPageP;
    })
    .then(function () {
        let emailTypeP = cTab.type("input[name = \"username\"]", email, {delay: 200});
        return emailTypeP;
    })
    .then(function () {
        let passwordTypeP = cTab.type("input[name = \"password\"]", password, {delay: 200});
        return passwordTypeP;
    })
    .then(function () {
        let loginP = cTab.click("button[data-analytics=\"LoginPassword\"]");
        return loginP;
    })
    .then(function() {
        let IPKitP = waitAndClickSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        return IPKitP;
    })
    .then(function () {
        let warmUpP = waitAndClickSelector("a[data-attr1=\"warmup\"]");
        return warmUpP;
    })
    .then(function () {
        let waitForQuestions = cTab.waitForSelector("a[data-analytics=\"ChallengeListChallengeName\"]", {visible: true});
        return waitForQuestions;
    })
    .then(function () {
        function collectQuestionsLink() {
            let allElems = document.querySelectorAll("a[data-analytics=\"ChallengeListChallengeName\"]");
            let linksArr = [];
            allElems.forEach(function (ele) {
                linksArr.push(ele.getAttribute("href"));
            })
            return linksArr;
        }

        let linksArrP = cTab.evaluate(collectQuestionsLink);
        return linksArrP;
    })
    .then(function (linksArr) {
        let questionSolvedP = questionSolver(linksArr[0]);
        return questionSolvedP;
    })
    .then(function() {
        console.log("Single Question Submitted!!");
    })

function questionSolver(url) {
    return new Promise(function (resolve, reject) {
        let fullLink = `https://www.hackerrank.com${url}`;
        let goToQuestionPageP = cTab.goto(fullLink);
        goToQuestionPageP
            .then(function() {
                let checkBoxWaitAndClickP = waitAndClickSelector(".custom-input-checkbox");
                return checkBoxWaitAndClickP;
            })
            .then(function() {
                let waitForTextBoxP = cTab.waitForSelector(".custominput", {visible: true});
                return waitForTextBoxP;
            })
            .then(function() {
                let codeTypeInTextBoxP = cTab.type(".custominput", answers[0], {delay: 100});
                return codeTypeInTextBoxP;
            })
            .then(function() {
                let controlKeyPressesP = cTab.keyboard.down("Control");
                return controlKeyPressesP;
            })
            .then(function() {
                let aKeyPressedP = cTab.keyboard.press("a");
                return aKeyPressedP;
            })
            .then(function() {
                let xKeyPressedP = cTab.keyboard.press("x");
                return xKeyPressedP;
            })
            .then(function() {
                let codeEditorPointerClickedP = cTab.click(".monaco-editor.no-user-select.vs");
                return codeEditorPointerClickedP;
            })
            .then(function() {
                let aKeyPressedP = cTab.keyboard.press("a");
                return aKeyPressedP;
            })
            .then(function() {
                let vKeyPressedP = cTab.keyboard.press("v");
                return vKeyPressedP;
            })
            .then(function() {
                let submitBtnClickedP = cTab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
                return submitBtnClickedP;
            })
            .then(function() {
                resolve();
            })
            .catch(function(err) {
                reject(err);
            })
    })
}

function waitAndClickSelector(selector) {
    return new Promise(function (resolve, reject) {
        let waitP = cTab.waitForSelector(selector, {visible: true});
        waitP
            .then(function() {
                let clickP = cTab.click(selector);
                return clickP;
            })
            .then(function () {
                resolve();
            })
            .catch(function(err) {
                reject(err);
            })
    });
}
let puppeteer = require("puppeteer");
let email = "niyiji9262@ddwfzp.com";
let password = "some_r@andom_p@ss";
let { answers } = require("./codes.js");
let cTab;


let browserOpenP = puppeteer.launch({   //Initially to launch the browser
    headless: false,                    //This wil make your browser visible
    defaultViewport: null,              //This will put your contents to fit the complete window
    args: ["--start-maximized"]         //This will display your browser in maximize form
});                                     //And this launch func return a instance of browser in a promise

browserOpenP
    .then(function (browser) {
        let allTabsP = browser.pages(); //This will give a promise of all of the tabs opened in your browser
        return allTabsP;
    })
    .then(function (allTabsArr) {  //This will goto the link in the tab which you selected(cTab here).
        cTab = allTabsArr[0];
        let visitLoginPageP = cTab.goto("https://www.hackerrank.com/auth/login");
        return visitLoginPageP;
    })
    .then(function () {     //This will type in the given selector with time delay between each characters.
        let emailTypeP = cTab.type("input[name = \"username\"]", email, { delay: 200 });
        return emailTypeP;
    })
    .then(function () {
        let passwordTypeP = cTab.type("input[name = \"password\"]", password, { delay: 200 });
        return passwordTypeP;
    })
    .then(function () {     //This will click on the given selector
        let loginP = cTab.click("button[data-analytics=\"LoginPassword\"]");
        return loginP;
    })
    .then(function () {
        let IPKitP = waitAndClickSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        return IPKitP;
    })
    .then(function () {
        let warmUpP = waitAndClickSelector("a[data-attr1=\"warmup\"]");
        return warmUpP;
    })
    .then(function () {
        let waitForQuestionsP = cTab.waitForSelector("a[data-analytics=\"ChallengeListChallengeName\"]", { visible: true });
        return waitForQuestionsP;
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

        let linksArrP = cTab.evaluate(collectQuestionsLink);  //This is used to do work with the DOM of the page to collect the data (Work done by the callback passed in it.)
        return linksArrP;
    })
    .then(function (linksArr) {
        let questionSolvedP = questionSolver(linksArr[0], 0);
        for (let i = 1; i < linksArr.length; i++) {
            questionSolvedP = questionSolvedP.then(function () {
                console.log(`Question - ${i - 1}. Submitted!!`);
                let nextQuestionSolveP = questionSolver(linksArr[i], i);
                return nextQuestionSolveP;
            })
        }
        questionSolvedP = questionSolvedP.then(function () {
            console.log(`Question - ${linksArr.length - 1}. Submitted!!`);
        })
        return questionSolvedP;
    })
    .then(function () {
        console.log("All Questions Submitted!!");
    })

function questionSolver(url, index) {
    return new Promise(function (resolve, reject) {
        let fullLink = `https://www.hackerrank.com${url}`;
        let goToQuestionPageP = cTab.goto(fullLink);
        goToQuestionPageP
            .then(function () {
                let checkBoxWaitAndClickP = waitAndClickSelector(".custom-input-checkbox");
                return checkBoxWaitAndClickP;
            })
            .then(function () {
                let waitForTextBoxP = cTab.waitForSelector(".custominput", { visible: true });
                return waitForTextBoxP;
            })
            .then(function () {
                let codeTypeInTextBoxP = cTab.type(".custominput", answers[index], { delay: 50 });
                return codeTypeInTextBoxP;
            })
            .then(function () {
                let controlKeyDownP = cTab.keyboard.down("Control");  //This gives access over the keyboard keys
                return controlKeyDownP;
            })
            .then(function () {
                let aKeyPressedP = cTab.keyboard.press("a");
                return aKeyPressedP;
            })
            .then(function () {
                let xKeyPressedP = cTab.keyboard.press("x");
                return xKeyPressedP;
            })
            .then(function () {
                let codeEditorPointerClickedP = cTab.click(".monaco-editor.no-user-select.vs");
                return codeEditorPointerClickedP;
            })
            .then(function () {
                let aKeyPressedP = cTab.keyboard.press("a");
                return aKeyPressedP;
            })
            .then(function () {
                let vKeyPressedP = cTab.keyboard.press("v");
                return vKeyPressedP;
            })
            .then(function () {
                let controlKeyUpP = cTab.keyboard.up("Control");
                return controlKeyUpP;
            })
            .then(function () {
                let submitBtnClickedP = cTab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
                return submitBtnClickedP;
            })
            .then(function () {
                let congratsP = cTab.waitForSelector(".congrats-wrapper", { visible: true });
                console.log("Wait over heading to resolve");
                return congratsP;
            })
            .then(function () {
                console.log("Entered resolved");
                resolve();
            })
            .catch(function (err) {
                console.log("Some error ", err);
                reject(err);
            })
    })
}

function waitAndClickSelector(selector) {
    return new Promise(function (resolve, reject) {   //Return our own created promise
        let waitP = cTab.waitForSelector(selector, { visible: true });  //This will wait until the page isn't vsible and DOM tree is generated
        waitP
            .then(function () {
                let clickP = cTab.click(selector);
                return clickP;
            })
            .then(function () {
                resolve();   //We call resolve when the work is completed (successfully).
            })
            .catch(function (err) {
                reject(err);    //We call reject when some error is encountered to the .catch()
            })
    });
}
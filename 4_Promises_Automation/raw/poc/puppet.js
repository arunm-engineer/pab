const puppeteer = require("puppeteer");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let gPage;

let browseropenP = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized","--incognito"]
})

 //Nesting in promises

// browseropenP
// .then(function (browser) {
//     console.log("Browser opened");
//     // let browserCloseP = browser.close();
//     // browserCloseP
//     // .then(function () {
//     //     console.log("Browser closed");
//     // })
//     let allTabsP = browser.pages();
//     allTabsP
//     .then(function (tabs) {
//         let page = tabs[0];
//         let googleHomePageOpenP = page.goto("https://www.google.com");
//         googleHomePageOpenP
//         .then(function () {
//             console.log("Google home page opened");
//         })
//     })
// })

//Chaining in promises

browseropenP
    .then(function (browser) {
        console.log("Browser opened");
        // let browserCloseP = browser.close();
        // browserCloseP
        // .then(function () {
        //     console.log("Browser closed");
        // })
        let allTabsP = browser.pages();
        return allTabsP;
    })
    .then(function (tabs) {
        gPage = tabs[0];
        let cricInfoP = gPage.goto(url);
        return cricInfoP;
    })
    .then(function () {
        function fn() {
            console.log("In browser");
            return document.querySelector(".best-player-name").innerText;
        }
        let playerNameP = gPage.evaluate(fn);
        return playerNameP;
    })
    .then(function (playerName) {
        console.log(playerName);
    })
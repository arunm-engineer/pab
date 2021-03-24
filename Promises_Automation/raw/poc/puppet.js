const puppeteer = require("puppeteer");
let browseropenP = puppeteer.launch({
    headless: false
})

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
        let page = tabs[0];
        let googleHomePageOpenP = page.goto("https://www.google.com");
        return googleHomePageOpenP;

    })
    .then(function () {
        console.log("Google home page opened");
    })
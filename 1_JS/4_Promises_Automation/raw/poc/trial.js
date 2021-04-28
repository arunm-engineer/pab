// document.querySelectorAll("article .text a")[0].innerText
// document.querySelector(".nextpostslink").getAttribute("href")
let puppeteer = require('puppeteer');
let pdfkit = require('pdfkit');
let fs = require('fs');

// SCREENSHOT WORK

// (async () => {
//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         args: ['--start-maximized']
//     })

//     let allTabsArr = await browser.pages();
//     let cTab = allTabsArr[0];
//     await cTab.goto("https://www.instagram.com/");
//     await cTab.screenshot({path: 'scrs.jpeg', type: 'jpeg', quality: 100});
//     console.log('Screenshot taken');
// })();

//PDF WORK

// let doc = new pdfkit();
// doc.pipe(fs.createWriteStream('newPDF.pdf'));
// doc
//   .addPage()
//   .fillColor('#0366d6')
//   .text('Here is a link!', 100, 100)
// //   .underline(100, 100, 160, 27, { color: '#0000FF' })
//   .link(100, 100, 160, 27, 'http://google.com/');
// doc.end();
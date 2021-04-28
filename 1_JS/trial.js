const PDFDocument = require('pdfkit');
const fs = require('fs');

let pdfDoc = new PDFDocument;
pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));

pdfDoc.fillColor('#1facac');
pdfDoc.lineGap(2);
for (let i = 0;i <= 2;i++) {
    pdfDoc.text("My Sample PDF Document" + i, {
        underline: true,
        link: 'https://www.google.com'
    })
    .moveDown(0);
}
pdfDoc.fillColor('black').text("My Sample PDF Document", 20, 300, {
    underline: true,
    link: 'https://www.google.com'
}).text("  Hello").text("----------Hello again")

pdfDoc.end();
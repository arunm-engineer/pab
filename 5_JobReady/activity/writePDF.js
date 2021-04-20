const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function writePDFDocument(QuestionsArr, location, companyName) {

    let pdfDoc = new PDFDocument;
    companyName = 'Prep' + companyName + '.pdf';
    let locationPath = path.join(location, companyName);

    pdfDoc.pipe(fs.createWriteStream(locationPath));
    pdfDoc.text('***Click on the questions to navigate');
    pdfDoc.fillColor('#399191');
    pdfDoc.moveDown(1);

    for (let i = 0;i < QuestionsArr.length;i++) {
        let questionTitle = QuestionsArr[i].title;
        let questionLink = QuestionsArr[i].link;
        let questionFrequency = QuestionsArr[i].frequency;
        pdfDoc.text(questionTitle + '          [' + questionFrequency + ']', {
            width: 500,
            link: questionLink
        });
    }
    pdfDoc.end();

}


module.exports = {
    writePDFDocument: writePDFDocument
}


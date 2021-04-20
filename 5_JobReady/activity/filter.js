let pdf = require('./writePDF.js')
let questionsTilte = [];
let questionsLinks = [];
let questionsfrequency = [];
let Questions = [];
let errorCases = [undefined, null, ''];

function filterQuestions(QuestionsArr, location, companyName) {
    QuestionsArr.forEach((element) => {
        let isArr = Array.isArray(element);
        if (isArr === true) {
            element.forEach((arrElement) => {
                let title = arrElement.title;
                let link = arrElement.link;
                mapQuestionWithFrequency(title, link);
            })
        }
        else {
            let title = element.title;
            let link = element.link;
            mapQuestionWithFrequency(title, link);
        }
    });
    fillQuestionsDetails();
    pdf.writePDFDocument(Questions, location, companyName);

}

function fillQuestionsDetails() {

    for (let i = 0;i < questionsTilte.length;i++) {
        Questions.push(
            {
                title: questionsTilte[i],
                link: questionsLinks[i],
                frequency: questionsfrequency[i]
            }
        );
    }
    sortQuestions();

}

function sortQuestions() {

    Questions.sort((a, b) => b.frequency > a.frequency ? 1 : -1);
    Questions = Questions.map((element, index) => {
        let title = (index+1) + '. ' + element.title;
        let link = element.link;
        let frequency = element.frequency;
        return {
            title, link, frequency
        }
    });

}

function mapQuestionWithFrequency(title, link) {

    if (errorCases.includes(title) || errorCases.includes(link)) return;

    if (questionsTilte.includes(title)) {
        let indexOfQuestion = questionsTilte.indexOf(title);
        questionsfrequency[indexOfQuestion]++;
    }
    else {
        questionsTilte.push(title);
        questionsLinks.push(link);
        questionsfrequency.push(1);
    }

}

module.exports = {
    filterQuestions: filterQuestions
}
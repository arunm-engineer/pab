let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");

function getMatchScoreCardDetails(url) {
    request(url, cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let scoreCardDetailsBox = chSelector(".match-info.match-info-MATCH")
    let descriptionGeneral = chSelector(scoreCardDetailsBox).find(".description").text();
    let descriptionArr = descriptionGeneral.split(",");
    let venue = (descriptionArr[1]).trim();
    let date = (descriptionArr[2]).trim();
    let descriptionResult = chSelector(scoreCardDetailsBox).find(".status-text span");
    let result = chSelector(descriptionResult).text();
    let batsmenContainers = chSelector(".Collapsible .table.batsman");
    for (let i = 0;i < batsmenContainers.length;i++) {
        let allBatsmenRows = chSelector(batsmenContainers[i]).find("tbody > tr");
        let teamSelect = chSelector(".Collapsible h5");
        let myTeam = chSelector(teamSelect[i]).text().split("INNINGS").shift().trim();
        let opponentTeamSelect = (i == 0) ? chSelector(teamSelect[1]).text() : chSelector(teamSelect[0]).text();
        let myOpponentTeam = opponentTeamSelect.split("INNINGS").shift().trim();
        for (let j = 0;j < allBatsmenRows.length-1;j+=2) {
            let batsmenDetails = chSelector(allBatsmenRows[j]).find("td");
            let name = chSelector(batsmenDetails[0]).find("a").text().trim();
            let runs = chSelector(batsmenDetails[2]).text();
            let balls = chSelector(batsmenDetails[3]).text();
            let fours = chSelector(batsmenDetails[5]).text();
            let sixes = chSelector(batsmenDetails[6]).text();
            let sr = chSelector(batsmenDetails[7]).text();
            // console.log(`name ${name} venue ${venue} date ${date} result ${result} runs ${runs} balls ${balls} fours ${fours} sixes ${sixes} sr ${sr} myTeam ${myTeam} myOpponentTeam ${myOpponentTeam}`);
            let playerObj = {name, venue, date, result, runs, balls, fours, sixes, sr, myTeam, myOpponentTeam};
            addPlayersDetails(myTeam, name, playerObj);
        }
    }
}

function addPlayersDetails(myTeam, name, playerObj) {
    let folderPath = path.join(__dirname, "ipl", myTeam);
    createDirectory(folderPath);
    let filePath = path.join(folderPath, name + ".json");
    let content = [];
    if (fs.existsSync(filePath) == true) {
        let buffer = fs.readFileSync(filePath);
        content = JSON.parse(buffer);
    }
    content.push(playerObj);
    fs.writeFileSync(filePath, JSON.stringify(content));
}

function createDirectory(folder) {
    if (fs.existsSync(folder) == false) {
        fs.mkdirSync(folder);
    }
}

module.exports = {
    getMatchScoreCardDetails: getMatchScoreCardDetails
}
let request = require("request");
let cheerio = require("cheerio");
let statsArr = [];

// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

function singlePageExtractor(url) {
    request(url,cb);
}

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    //Find winningTeam
    let teams = chSelector(".match-info.match-info-MATCH .teams").find(".team");  
    let winnerTeamNum = 0;   //Winning Team index num
    let winnerName = "";
    for (let i = 0;i < teams.length;i++) {
        if (chSelector(teams[i]).hasClass("team-gray") == false) {
            winnerTeamNum = i;
            winnerName = chSelector(teams[i]).find("p").text();
        }
    }

    let batsmenBox = chSelector(".table.batsman");   
    let winnerBatsmenBox = chSelector(batsmenBox[winnerTeamNum]);  //Winning team batsmen box as a whole

    let winnerBatsmenBoxHeading = chSelector(winnerBatsmenBox).find("thead").find("th");   //Headings
    let winnerBatsmenBoxBody = chSelector(winnerBatsmenBox).find("tbody").find("tr");     //Values corresponding to headings 

    //Map according to the heading and values and add individual batsmen details. Returns an array of objects with batsmen details.
    for (let i = 0;i < winnerBatsmenBoxBody.length-1;i+=2) {    
        let eachBatsmen = chSelector(winnerBatsmenBoxBody[i]).find("td");
        // let batsmenDetails = {};
        let name = "";
        let runs = 0;
        for (let j = 0;j < eachBatsmen.length;j++) {
            if (j == 0) {
                name = chSelector(eachBatsmen[j]).find("a").text();
                // batsmenDetails[chSelector(winnerBatsmenBoxHeading[j]).text()] = name;
            }
            else if (j == 2) {
                runs = Number(chSelector(eachBatsmen[j]).text());
            }
            // else if (j != 1 && j != 4) {
            //     batsmenDetails[chSelector(winnerBatsmenBoxHeading[j]).text()] = chSelector(eachBatsmen[j]).text();
            // }
        }
        addToLeaderboard(name, runs);
        // statsArr.push(batsmenDetails);   //Finally added all batsmen details of the team to the array.
    }
    // console.table(statsArr);
    // console.log(winnerName);
    // console.table(statsArr);   //Takes array of objects as input. Prints content in a tabular (table) format.
}


function addToLeaderboard(playerName, playerRuns) {
    let playerExists = false;
    for (let i = 0;i < statsArr.length;i++) {
        if (statsArr[i].name == playerName) {
            statsArr[i].runs += playerRuns;
            playerExists = true;
            break;
        }
    }
    if (playerExists == false) {
        statsArr.push({
            name: playerName,
            runs: playerRuns
        });
    }
}

module.exports = {
    extract: singlePageExtractor
}
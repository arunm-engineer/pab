let request = require("request");
let cheerio = require("cheerio");
// let extractor = require("./singleMatchDetails");

let statsArr = [];
let globalCount = 0;
let localCount = 1;

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url,cb);

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let matches = chSelector(".col-md-8.col-16");
    globalCount = matches.length;
    for (let i = 0;i < matches.length;i++) {
        let allAnchorOfMatch = chSelector(matches[i]).find(".match-cta-container .btn.btn-sm.btn-outline-dark.match-cta");
        let url = chSelector(allAnchorOfMatch[2]).attr("href");
        let fullUrl = "https://www.espncricinfo.com" + url;
        // console.log(fullUrl);
        // extractor.extract(fullUrl);
        request(fullUrl,cbDetails);
    }
}

function cbDetails(err, response, html) {
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

    winTeamDetails(chSelector, winnerBatsmenBoxBody, winnerBatsmenBoxHeading);
    
    if (localCount == globalCount) {
        console.table(statsArr);
    }
    else {
        localCount++;
    }
}

function winTeamDetails(chSelector, winnerBatsmenBoxBody, winnerBatsmenBoxHeading) {
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
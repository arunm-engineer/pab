let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url,cb);

function cb(err, response, html) {
    let teamBatsmenDetails = [];

    let chSelector = cheerio.load(html);
    //Find winningTeam
    let teams = chSelector(".match-info.match-info-MATCH .teams").find(".team");  
    let winnerTeamNum = 0;   //Winning Team index num
    for (let i = 0;i < teams.length;i++) {
        if (chSelector(teams[i]).hasClass("team-gray") == false) {
            winnerTeamNum = i;
        }
    }

    let batsmenBox = chSelector(".table.batsman");   
    let winnerBatsmenBox = chSelector(batsmenBox[winnerTeamNum]);  //Winning team batsmen box as a whole

    let winnerBatsmenBoxHeading = chSelector(winnerBatsmenBox).find("thead").find("th");   //Headings
    let winnerBatsmenBoxBody = chSelector(winnerBatsmenBox).find("tbody").find("tr");     //Values corresponding to headings 

    //Map according to the heading and values and add individual batsmen details.
    for (let i = 0;i < winnerBatsmenBoxBody.length-1;i+=2) {    
        let eachBatsmen = chSelector(winnerBatsmenBoxBody[i]).find("td");
        let batsmenDetails = {};
        for (let j = 0;j < eachBatsmen.length;j++) {
            if (j == 0) {
                let batsmenName = chSelector(eachBatsmen[j]).find("a").text();
                batsmenDetails[chSelector(winnerBatsmenBoxHeading[j]).text()] = batsmenName;
            }
            else if (j != 1 && j != 4) {
                batsmenDetails[chSelector(winnerBatsmenBoxHeading[j]).text()] = chSelector(eachBatsmen[j]).text();
            }
        }
        teamBatsmenDetails.push(batsmenDetails);   //Finally added all batsmen details of the team to the array.
    }
    // console.log(teamBatsmenDetails);
}
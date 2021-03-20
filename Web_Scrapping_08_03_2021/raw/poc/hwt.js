let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let tables = chSelector(".table.bowler");
    // let bowlersHtml = "";
    for (let i = 0;i < tables.length;i++) {
        // bowlersHtml += chSelector(tables[i]).html();
        let teamBowlers = chSelector(tables[i]).find("tr");   //Finds tr within the content available.
        for (let j = 1;j < teamBowlers.length;j++) {
            // let bowlerStat = chSelector(teamBowlers[j]).text();
            let eachBowler = chSelector(teamBowlers[j]).find("td");  //Finds td within the content available.
            let bowlerName = chSelector(eachBowler[0]).text();
            let wickets = chSelector(eachBowler[4]).text();
            console.log(bowlerName,"    ",wickets);
        }
        console.log("---------------------");
    }
}
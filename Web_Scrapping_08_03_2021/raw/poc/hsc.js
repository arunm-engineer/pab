let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let tables = chSelector(".table.batsman");
    let batsmenHtml = "";
    
    for (let i = 0;i < tables.length;i++) {
        let teamBatsmen = chSelector(tables[i]).find("tbody").find("tr");
        let hrunsPlayerName = "";
        let hruns = 0;
        for (let j = 0;j < teamBatsmen.length-1;j+=2) {
            let eachBatsmen = chSelector(teamBatsmen[j]).find("td");
            // console.log(eachBatsmen);
            let batsmenName = chSelector(eachBatsmen[0]).find("a").text();
            let runs = chSelector(eachBatsmen[2]).text();
            if (Number(runs) >= hruns) {
                hrunsPlayerName = batsmenName;
                hruns = runs;
            }
            console.log(batsmenName,"   ",runs);
        }
        console.log(hrunsPlayerName, "is the highest run scorer with runs :", hruns);
        console.log("---------------------------------------------------------");
        
    }
}
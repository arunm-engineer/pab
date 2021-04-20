#!/usr/bin/env node

const help = require('./help.js');
const scrap = require('./scrap.js');
let input = process.argv.slice(2);

let command = input[0];
let location = input[1];
let companyName = input[2];
console.log(companyName);

switch(command) {            //Example command : prep ie F:\ "Oyo Rooms" 
    case 'ie':
        scrap.scrapExperiencs(location, companyName);
        break;
    default:
        help.helpWithCommand();
        break;
}
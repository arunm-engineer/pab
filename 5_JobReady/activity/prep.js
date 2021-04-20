#!/usr/bin/env node

const help = require('./help.js');
const scrap = require('./scrap.js');
let input = process.argv.slice(2);

let command = input[0];
let location = input[1];
let companyName = input[2];

switch(command) {           
    case 'ie':
        scrap.scrapExperiences(location, companyName);
        break;
    default:
        help.helpWithCommand();
        break;
}

#!/usr/bin/env node

let helpFile = require("./commands/help");
let organizeFile = require("./commands/organize");
let viewFile = require("./commands/view");

let input = process.argv.slice(2);

let command = input[0];
switch(command){
    case "view":
        viewFile.fn(input[1],input[2]);
        break;
    case "organize":
        organizeFile.fn(input[1]);
        break;
    case "help":
        helpFile.fn();
        break;
    default:
        console.log('Wrong command. Type help for all the commands.');
        break;
}

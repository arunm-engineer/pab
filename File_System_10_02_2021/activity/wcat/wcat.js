#!/usr/bin/env node

let fs = require("fs");
let allNumbering = require("./commands/allNumbering.js");
let appendContent = require("./commands/appendContent.js");
let displayAll = require("./commands/displayAll.js");
let displaySingle = require("./commands/displaySingle.js");
let nonEmptyNumbering = require("./commands/nonEmptyNumbering.js");
let removeLineSpacing = require("./commands/removeLineSpacing.js");
let removeSpaceAndWrite = require("./commands/removeSpaceAndWrite.js");
let writeContent = require("./commands/writeContent.js");
let helper = require("./commands/help.js");

let input = process.argv.slice(2);

let command = input[0];

switch (command) {
    case "help":
        helper.helperCommands();
        break;
    case "-s":
        if (input.length == 2) {
            removeLineSpacing.removeLineBreaks(input[1]);
        }
        else {
            removeSpaceAndWrite.removeLineBreaksAndWrite(input[1],input[3]);
        }
        break;
    case "-b":
        if (input[1] == "-n") {
            nonEmptyNumbering.lineNumbering(input[2]);
        }
        else {
            nonEmptyNumbering.lineNumbering(input[1]);
        }
        break;
    case "-n":
        if (input[1] == "-b") {
            allNumbering.lineNumbering(input[2]);
        }
        else {
            allNumbering.lineNumbering(input[1]);
        }
        break;
    default:
        let isFile = isFileOrNot(command);
        if (isFile) {
            findCommand(command);
        }
        else {
            console.log("Wrong command.");
        }
}

function isFileOrNot(filePath) {
    return fs.lstatSync(filePath).isFile();
}

function findCommand(filePath) {
    if (input.length == 1) {
        displaySingle.displayFile(filePath);
    }
    else if (input.length == 3) {
        let filePath1 = filePath;
        let filePath2 = input[2];
        let sign = input[1];
        if (sign == ">") {
            writeContent.writeFileContent(filePath1, filePath2);
        }
        else if (sign == ">>") {
            appendContent.writeFileContent(filePath1, filePath2);
        }
    }
    else {
        displayAll.displayFile(input);
    }
}
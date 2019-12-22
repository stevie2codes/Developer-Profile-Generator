const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');
const electron = require('electron');
const elecToHtml = require('electron-html-to');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
    return inquirer.prompt([
      {
          type: "input",
          name: "name",
          message: "What is Your gitHub userName?"
      },
        {
            type: "input",
            name: "name",
            message: "Whats your favorite color?"
        }
        
    ])
}
promptUser();
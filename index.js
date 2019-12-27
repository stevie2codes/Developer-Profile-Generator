const html = require("./generateHTML");
const inquirer = require("inquirer");
const fs = require("fs");

//     convertFactory = require('electron-html-to');
// const conversion = convertFactory({
//     converterPath: convertFactory.converters.PDF
// });
const util = require('util');
const electron = require('electron');
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);
let avatar_url = null;

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is Your gitHub userName?"
        },
        {
            type: "input",
            name: "color",
            message: "Whats your favorite color?"
        }
    ]);
}
   async function init() {
       try{
           const data = await promptUser();
           
           const { username } = data;
           const queryURL = `https://api.github.com/users/${username}`;
           axios
           .get(queryURL)
            .then(function(res){
                console.log(res.data);
                 avatar_url = res.data.avatar_url;
                 const page =   html.generateHTML(data,avatar_url);
                writeFileAsync("index.html", page);
            })
           
       }
       catch(err){
               console.log(err);
       }
    }
    init();
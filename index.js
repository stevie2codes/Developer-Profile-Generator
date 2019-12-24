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



function promptUser() {
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
    ])

        // .then(function ({ username }) {
        //     const queryUrl = `https://api.github.com/users/${username}`;

        //     axios.get(queryUrl).then(function (res) {
        //         const repoNames = res.data.map(function (repo) {
        //             return repo.name;
        //         })

        //     }


        .then(function (data) {
            const page = html.generateHTML(data);

            return writeFileAsync("index.html", page);
        })
        .then(function () {
            console.log("success!");
        })

        .catch(function (err) {
            console.log(err);

        });

}
promptUser();
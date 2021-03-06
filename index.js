const html = require("./generateHTML");
const inquirer = require("inquirer");
const fs = require("fs"),
    convertFactory = require(`electron-html-to`);
const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});
const util = require('util');
const electron = require('electron');
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

require('dotenv').config();

const googleKey = process.env.API_KEY;


//Prompt user questions//
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "username",
            message: "What is Your gitHub userName?"
        },
        {
            type: "rawlist",
            name: "color",
            choices: ["red", "blue", "green", "pink"],
            message: "Pick a color theme for your profile"
        }
    ]);
}
//getting data from github json 
async function init() {
    try {
        const data = await promptUser();
        const {
            username
        } = data;
        const queryURL = `https://api.github.com/users/${username}`;
        axios
            .get(queryURL)
            .then(function (res) {
                // console.log(res.data);
                avatar = res.data.avatar_url;
                name = res.data.name;
                bio = res.data.bio;
                repos = res.data.public_repos;
                followers = res.data.followers;
                following = res.data.following;
                blog = res.data.blog;
                location = res.data.location;
                gitHub = res.data.html_url;

                //new call to github to get number of stars in repo
                axios
                    .get(queryURL + "/starred")
                    .then(function (res) {
                        // console.log(res.data)
                        stars = res.data.length;
                        googleLoc = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=12&size=400x400&key=${googleKey}`;
                        const page = html.generateHTML(data, avatar, name, bio, repos, stars, followers, following, location, gitHub, blog, googleLoc);
                        writeFileAsync("index.html", page);

                        //File Conversion
                        conversion({
                                file: 'index.html',
                                html: page
                            },
                            function (err, result) {
                                if (err) {
                                    return console.log(err);
                                }
                                // console.log(result.numberOfPages);
                                // console.log(result.logs);
                                result.stream.pipe(fs.createWriteStream("Dev-profile.pdf"));
                                conversion.kill();
                            });
                    });
            })
    } catch (err) {
        console.log(err);
    }
    console.log("successfully created a Portfolio! Check it out in the Root directory!");

}
init();
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let continueSwitch = true;
const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function init() {
    try {
    console.log("Please build your team.");

    const {managerName, managerId, managerEmail, managerOffice} = await inqManager();
    const manager = new Manager (managerName, managerId, managerEmail, managerOffice);
    team.push(manager);
    
    while (continueSwitch) {
       const { option } = await doContinue(); 
       switch (option) {
            
           case "Engineer" :

            const {engineerName, engineerId, engineerEmail, engineerGithub} = await inqEngineer();
            const engineer = new Engineer (engineerName, engineerId, engineerEmail, engineerGithub);
            team.push(engineer);
            break;

           case "Intern" :

           const {internName, internId, internEmail, internSchool} = await inqIntern();
           const intern = new Intern (internName, internId, internEmail, internSchool);
           team.push(intern);
           break;

           default :
           continueSwitch = false;
           break;
        }
    }
    return writeFileAsync(outputPath, render.render(team));
}
catch (err) {
    console.log(err);
}
}


function inqManager() {
    return inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is your Manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your Manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your Manager's email?"
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is your Manager's office number?"
        },
    ])
};

function doContinue() {
    return inquirer.prompt(
        [{
            type: "list",
            name: "option",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I do not want to add another team member"]
        }])
       
};


// .then(val => {

//     if (val.addEmployee === "Engineer") {
//         //new Engineer
//         inqEngineer();
//     } else if (val.addEmployee === "Intern") {
//         //new Intern
//         inqIntern();
//     } else {
//         //
//         //render();
//     }
// });

function inqEngineer() {
    return inquirer.prompt(
    [{
        type: "input",
        name: "engineerName",
        message: "What is your Engineer's name?"
    }, 
    {
        type: "input",
        name: "engineerId",
        message: "What is your Engineer's ID?"
    }, 
    {
        type: "input",
        name: "engineerEmail",
        message: "What is your Engineer's email?"
    }, 
    {
        type: "input",
        name: "engineerGithub",
        message: "What is your Engineer's GitHub username?"
    }
]);
};

function inqIntern() {
    return inquirer.prompt([{
        type: "input",
        name: "internName",
        message: "What is your Intern's name?"
    }, {
        type: "input",
        name: "internId",
        message: "What is your Intern's ID?"
    }, {
        type: "input",
        name: "internEmail",
        message: "What is your Intern's email?"
    }, {
        type: "input",
        name: "internSchool",
        message: "What school is your Intern from?"
    }
]);
};

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
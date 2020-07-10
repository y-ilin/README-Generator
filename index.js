const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Repository title: "
    },
    {
      type: "input",
      name: "description",
      message: "Description: "
    },
    {
      type: "input",
      name: "installation",
      message: "Installation instructions: "
    },
    {
      type: "input",
      name: "usage",
      message: "Usage information:"
    },
    {
        type: "list",
        name: "license",
        message: "Choose a license for your application: ",
        choices: ["a", "b", "c", "d"]
    },
    {
      type: "input",
      name: "contributing",
      message: "Contribution details: "
    },
    {
      type: "input",
      name: "tests",
      message: "Test instructions: "
    }
  ]);
}


function generateREADME(answers) {
    return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
${answers.tableOfContents}

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
My GitHub: ${answers.github}
Any questions regarding this repository can be directed to ${answers.email}

`;
}

// Function to generate badge based on promptUser answer.license
`WHEN I choose a license for my application from a list of options
THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under`

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const readme = generateREADME(answers);

    await writeFileAsync("./GeneratedREADME/README.md", readme);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();

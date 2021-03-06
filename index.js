const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// Prompts user for README content
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
      choices: ["Apache License 2.0", "ISC", "GNU GPLv3", "MIT"],
      default: "MIT"
    },
    {
      type: "input",
      name: "contributing",
      message: "Contribution details: ",
      default: `To contribute directly to the code base, please see this [How to Contribute](https://github.com/Microsoft/vscode/wiki/How-to-Contribute) document`
    },
    {
      type: "input",
      name: "tests",
      message: "Test instructions: "
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub handle? "
    },
    {
      type: "input",
      name: "email",
      message: "What is your email? "
    }
  ]);
}

// Generates README, taking in user's answers in promptUser function and license badge determined in generateLicenseBadge function
function generateREADME(answers, licenseBadge) {
    return `
# ${answers.title}
${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
Licensed under the ${answers.license} License.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
The author's GitHub: https://github.com/${answers.github}

Any questions regarding this repository can be directed to ${answers.email}

`;
}

// Generates license badge using user's answers from promptUser function
function generateLicenseBadge(license) {
  let badge = ""
  if (license === "Apache License 2.0") {
    badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  } else if (license === "ISC") {
    badge = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
  } else if (license === "GNU GPLv3") {
    badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  } else if (license === "MIT") {
    badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  }
  return badge;
}

// Main function generating README
async function init() {
  try {
    // Prompt user for information
    const answers = await promptUser();
    // Determine relevant license badge
    const licenseBadge = await generateLicenseBadge(answers.license);

    // Writing README file
    const readme = generateREADME(answers, licenseBadge);
    await writeFileAsync("./generated-files/README.md", readme);
    console.log("Successfully wrote to README.md");

  } catch(err) {
    console.log(err);
  }
}

init();

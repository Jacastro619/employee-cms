# Employee CMS ![Static Badge](https://img.shields.io/badge/license-MIT-blue)

## Technology Used

| Technology Used     |                                                    Resource URL                                                    |
| ------------------- | :----------------------------------------------------------------------------------------------------------------: |
| JavaScript          | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Node.js             |                              [https://nodejs.org/en/docs](https://nodejs.org/en/docs)                              |
| MySQL               |                              [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)                              |
| Inquirer v8.2.4 npm |                  [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)                  |
| Git                 |                                    [https://git-scm.com/](https://git-scm.com/)                                    |

## Description

This is a CMS service that will keep track of departments, roles, employees, and more for a company. All the user needs to do is choose what action they would like to do and then answer the following prompts. A nice table will be displayed in the terminal with the information requested.

For video demonstration click [HERE](https://drive.google.com/file/d/1ragorfKqUXj-VfYW-7Y1e1K4bGnlBP6N/view?usp=sharing)

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [License](#license)
- [Questions](#questions)
- [Author Info](#author-info)

## Usage

The user will choose from the choices of what actions to take. If the user decides to view either department, role, or employees, then the user will be shown a table with the requsted information. If the user wishes to add data into the database, then the user will need to pick an 'Add' action. After the user picks an action, the user will need to answer the following prompts. Once the user answers the prompts based on the action that was chosen, then the information provided will be added to the database.

## Installation

Assuming the user has Node.js and MySQL properly installed and has configured a local database, the user will run schema.sql files in MySQL to create the employee_db. Optionally, the user can seed the tables in database with pre established values by running the seeds.sql file. Once the employee_db is configured, the user will simply run 'npm i' to install dependencies. Once the user has dependencies installed, they will need to make sure the source code in index.js has the proper createConnection configurations respective to the user's local database using MySQL. Once installations and configurations are complete, the user will run 'npm index.js' and will be able to select actions to either view, add, or update (only employee role).

## License

This project is covered under the MIT License. For more information about license go to [https://mit-license.org/](https://mit-license.org/)

## Questions

If there are additional questions, you may contact me at jorgecastro619@gmail.com or visit my [GitHub](https://github.com/Jacastro619)

## Author Info

Created by Jorge Castro, a student at UC Berkeley Full Stack Coding Academy. For more information go to https://bootcamp.berkeley.edu/coding/

- [Portfolio](https://jacastro619.github.io/my-portfolio/)

- [LinkedIn](https://www.linkedin.com/in/jorge-castro-2a9545177/)

- [GitHub](https://www.linkedin.com/in/jorge-castro-2a9545177/)

const mysql = require("mysql2");
const inquirer = require("inquirer");
const { initQuestions } = require("./questions");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connecting to the cms_db database...`)
);

function init() {
  inquirer.prompt(initQuestions).then((data) => {
    switch (data.initAction) {
      case "View All Departments":
        break;
      case "View All Roles":
        break;
      case "View All Employees":
        break;
      case "Add a Department":
        break;
      case "Add a Role":
        break;
      case "Add an Employee":
        break;
    }
  });
}

init();

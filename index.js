const inquirer = require("inquirer");
const { initQuestions } = require("./questions");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connecting to the cms_db database...`)
);

function viewDepartments() {
  db.query(`SELECT * FROM departments`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
      init();
    }
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
      init();
    }
  });
}

function init() {
  inquirer.prompt(initQuestions).then((data) => {
    switch (data.initAction) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
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

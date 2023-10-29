const inquirer = require("inquirer");
const { initQuestions, addDepQuestion } = require("./questions");
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

function viewEmployees() {
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, employees.manager_id AS manager
  FROM employees
  JOIN roles ON employees.role_id = roles.id
  JOIN departments ON roles.department_id = departments.id;`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.table(data);
        init();
      }
    }
  );
}

function addDepartment() {
  inquirer.prompt(addDepQuestion).then((data) => {
    let addedDep = data.addedDepartment;
    db.query(
      `INSERT INTO departments (name) VALUES("${addedDep}")`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added ${addedDep} to the database`);
          init();
        }
      }
    );
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
        viewEmployees();
        break;
      case "Add a Department":
        addDepartment();
        break;
      case "Add a Role":
        break;
      case "Add an Employee":
        break;
    }
  });
}

init();

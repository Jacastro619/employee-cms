const inquirer = require("inquirer");
const { initQuestions, addDepQuestion, roleQuestions } = require("./questions");
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

function viewRoles(depArray) {
  db.query(`SELECT * FROM roles`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < data.length; i++) {
        data[i].department = depArray[`${data[i].department_id - 1}`];
        delete data[i].department_id;
      }
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
        for (i = 0; i < data.length; i++) {
          for (j = 0; j < data.length; j++) {
            if (data[i].manager === data[j].id) {
              data[i].manager = `${data[j].first_name} ${data[j].last_name}`;
            }
          }
        }
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

// WORK HERE
function addRole() {
  rerenderDepartments().then((depArray) => {
    const addRoleQuestions = [
      {
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "Which department does the role belong to?",
        choices: depArray,
        name: "department",
      },
    ];
    inquirer.prompt(addRoleQuestions).then((data) => {
      let { roleName, roleSalary, department } = data;
      for (i = 0; i < depArray.length; i++) {
        if (department === depArray[i]) {
          department = depArray.indexOf(department) + 1;
          break;
        }
      }
      console.log(department);
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES("${roleName}", ${roleSalary}, ${department})`,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Added ${roleName} to the database`);
            init();
          }
        }
      );
    });
  });
}

function init() {
  inquirer.prompt(initQuestions).then((data) => {
    switch (data.initAction) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        rerenderDepartments().then((depArray) => {
          viewRoles(depArray);
        });

        break;
      case "View All Employees":
        viewEmployees();
        break;
      case "Add a Department":
        addDepartment();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Add an Employee":
        break;
      case "Update an Employee Role":
        break;
    }
  });
}

init();

function rerenderDepartments() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT name FROM departments`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const depArray = data.map((dep) => dep.name);
        resolve(depArray);
      }
    });
  });
}

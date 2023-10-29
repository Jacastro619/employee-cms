// DONT FORGET TO ADD COMMENTS!!!
const inquirer = require("inquirer");
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

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
    ],
    name: "initAction",
  },
];

const addDepQuestion = [
  {
    message: "What is the name of the department?",
    name: "addedDepartment",
  },
];

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

function addEmployee(roleArray, manArray) {
  const roleMap = {};
  roleArray.forEach((role, index) => {
    roleMap[role] = index + 1;
  });
  console.log(roleMap);
  const addEmployeeQuestions = [
    {
      message: "What is the employee's first name?",
      name: "fName",
    },
    {
      message: "What is the employee's last name?",
      name: "lName",
    },
    {
      type: "list",
      message: "What is the employees Role?",
      choices: roleArray,
      name: "empRole",
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      choices: manArray,
      name: "empManager",
    },
  ];
  inquirer.prompt(addEmployeeQuestions).then((data) => {
    let { fName, lName, empRole, empManager } = data;
    console.log(data);
    console.log(roleArray);

    const roleID = roleMap[empRole];

    const managerID =
      empManager === "None" ? null : manArray.indexOf(empManager);

    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${fName}", "${lName}", ${roleID}, ${managerID})`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`added ${fName} ${lName} to database`);
          init();
        }
      }
    );
  });
}

function updateEmpRole(roleArray, manArray) {
  const roleMap = {};
  roleArray.forEach((role, index) => {
    roleMap[role] = index + 1;
  });
  const updateQuestions = [
    {
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: manArray,
      name: "employee",
    },
    {
      type: "list",
      message: "Which role do you want to assign the selected employee?",
      choices: roleArray,
      name: "updatedRole",
    },
  ];
  inquirer.prompt(updateQuestions).then((res) => {
    let { employee, updatedRole } = res;
    const roleID = roleMap[updatedRole];

    const employeeID = manArray.indexOf(employee);

    db.query(
      `UPDATE employees SET role_id = ${roleID} WHERE id = ${employeeID}`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${employee}'s role has successfully been updated`);
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
        renderRoles().then((roleArray) => {
          renderManagers().then((manArray) => {
            addEmployee(roleArray, manArray);
          });
        });
        break;
      case "Update an Employee Role":
        renderRoles().then((roleArray) => {
          renderManagers().then((manArray) => {
            updateEmpRole(roleArray, manArray);
          });
        });
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

function renderRoles() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM roles`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const roleArray = data.map((role) => role.title);
        resolve(roleArray);
      }
    });
  });
}

function renderManagers() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM employees`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const manArray = ["None"];
        for (i = 0; i < data.length; i++) {
          manArray.push(`${data[i].first_name} ${data[i].last_name}`);
        }
        resolve(manArray);
      }
    });
  });
}

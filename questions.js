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

module.exports = { initQuestions, addDepQuestion };

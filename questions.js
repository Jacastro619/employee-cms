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

module.exports = { initQuestions };
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
    } else console.table(data);
  });
}

module.exports = { viewDepartments };

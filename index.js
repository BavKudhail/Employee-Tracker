// node modules
const mysql2 = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// connect to database
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: eTracker_db,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`connected as id: ${connection.threadId}`);
});

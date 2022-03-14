// node modules
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");

const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "eTracker_db",
  },
  console.log(`Connected to eTracker_db database`)
);

// db.connect(function (err) {
//   if (err) throw err;
//   console.log(`connected as id: ${connection.threadId}`);
// });

// const printLogo = () => {
//   figlet("Hello World!!", function (err, data) {
//     if (err) {
//       console.log("Something went wrong...");
//       console.dir(err);
//       return;
//     }
//     console.log(data);
//   });
// };

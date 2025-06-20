const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err);
  } else {
    console.log("Database connected.");
  }
});

module.exports = con;
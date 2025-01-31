var mysql = require("mysql");
require("dotenv").config();

module.exports.getClient = async () => {
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.PG_DATABASE,
  });
  await con.connect((err) => {
    if (err) {
      console.error("Error connecting: " + err);
    }
  });
  return con;
};

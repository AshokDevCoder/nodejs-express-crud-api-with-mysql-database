const mysql = require("mysql");
require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE_NAME,
// });
const db = mysql.createConnection(process.env.DATABASE_URL);

module.exports = db;

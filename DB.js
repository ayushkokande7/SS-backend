const mysql = require("mysql");
require("dotenv").config();

// const connection = mysql.createConnection({
//   host: "srv484.hstgr.io",
//   //   port: 3306,
//   user: "u409067159_Admin",
//   password:
//     "R}Ph!dVtq~YUE2KDb9LAub]06-Unuv*}GF_BXM>@2d5swHNVC#2q#oa8G>CoQy_m:Lm]x.E?Kc#o>U:~}G^eDJftgLMWR_A5UZv)",
//   database: "u409067159_studifysuccess",
// });

// connection.connect((err) => {
//   if (err) console.log(err);
//   console.log("Connected to the remote database!");
// });

let pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// pool.on('connection', function (connection) {
//   console.log('DB Connection established');

//   connection.on('error', function (err) {
//     console.error(new Date(), 'MySQL error', err.code);
//   });
//   connection.on('close', function (err) {
//     console.error(new Date(), 'MySQL close', err);
//   });

// });

module.exports = pool;

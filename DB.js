const mysql2 = require("mysql2");
require("dotenv").config();

let mainDB = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

let courseDB = mysql2
  .createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_C_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_C_DATABASE,
  })
  .promise();

let lmsDB = mysql2
  .createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_LMS_USER,
    password: process.env.DB_LMS_PASSWORD,
    database: process.env.DB_LMS_USER,
  })
  .promise();

module.exports = {
  mainDB,
  courseDB,
  lmsDB,
};

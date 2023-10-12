const express = require("express");
const router = express();
const DB = require("../DB");

router.get("/", (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(`SELECT * FROM interns_quiz `, (err, result) => {
      if (err) {
        res.json({ error: err });
      }
      res.json({ data: result });
      conn.release();
    });
  });
});

module.exports=router;
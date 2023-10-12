const express = require("express");
const DB = require("../DB");
const router = express();
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(`SELECT * FROM interns_leaders `, (err, result) => {
      if (err) {
        res.json({ error: err });
      }
      res.json({ data: result });
      conn.release();
    });
  });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { curpassword, password, npassword } = req.body;
  if (password !== npassword)
    return res.status(401).json({ msg: "Password and Confirm Password are not matching!" });

  DB.getConnection((err, conn) => {
    if (err) {
      return res.json({ err: err, data: "DB connection error" });
    }
    conn.query(
      `SELECT password from interns_leaders where id = ?`,
      [id],
      (err, data) => {
        if (err) {
          res.json({ error: err });
          conn.release();
        }
        if (data[0].password !== curpassword)
          return res.status(401).json({ msg: "Your current password is incorrect!" });

        conn.query(
          `UPDATE interns_leaders SET password= ? where id = ${id}`,
          [password],
          (err) => {
            if (err) {
              res.json({ error: err });
              conn.release();
            }
            res.status(200).json({ msg: "Password changed successfully!" });
            conn.release();
          }
        );
      }
    );
  });
});

module.exports = router;

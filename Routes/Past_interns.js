const express = require("express");
const {mainDB: DB} = require("../DB");
const router = express();
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(`SELECT * FROM interns_past_interns_details order by id desc `, (err, result) => {
      if (err) {
        res.json({ error: err });
      }
       if (result.length === 0) {
          res.status(400).json({ err: "NULL" });
       }else res.json({ data: result });
      conn.release();
    });
  });
});


router.post(
  "/",
  [
    body("leader").notEmpty(),
    body("email").notEmpty(),
    body("education").notEmpty(),
    body("LOR_issued").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
    const {
      fname,
      lname,
      profile,
      phone,
      leader,
      email,
      education,
      duration_month,
      starting_date,
      ending_date,
      description,
      intern_review,
      certificate_issued,
      LOR_issued,
    } = req.body;

    const mdata = [
      fname,
      lname,
      leader,
      profile,
      phone,
      email,
      education,
      duration_month,
      starting_date,
      ending_date,
      intern_review,
      certificate_issued,
      LOR_issued,
      description,
    ];

    DB.getConnection((err, conn) => {
      if (err) {
        res.json({ err: err, data: "DB connection error" });
        return;
      }

      conn.query(
        `INSERT INTO interns_past_interns_details (fname, lname, leader, profile, phone, email, education, duration_month, starting_date, ending_date, intern_review, certificate_issued, LOR_issued,description) values (?)`,
        [mdata],
        (err, result) => {
          if (err) {
            res.json({ error: err });
            conn.release();
          }
          res.json({ msg: "Data inserted Successfully", data: result });
          conn.release();
        }
      );
    });
  }
);

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(
      `UPDATE interns_past_interns_details SET ? where id = ${id}`,
      [req.body],
      (err, data) => {
        if (err) {
          res.json({ error: err });
          conn.release();
        }
        res.json({ msg: "Data Edited Successfully", data: data });
        conn.release();
      }
    );
  });
});

module.exports = router;

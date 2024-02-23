const express = require("express");
const { mainDB: DB } = require("../DB");
const router = express();
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(
      `SELECT * FROM interns_present_interns_details order by id desc`,
      (err, result) => {
        if (err) {
          res.json({ error: err });
        }
        if (result.length === 0) {
          res.status(400).json({ err: "NULL" });
        } else {
          res.json({ data: result });
        }
        conn.release();
      },
    );
  });
});

router.get("/count", (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(`CALL count_all()`, (err, result) => {
      if (err) {
        res.json({ error: err });
      }
      res.json({ data: result[0] });
      conn.release();
    });
  });
});

router.post(
  "/",
  [
    body("leader").notEmpty(),
    body("phone").notEmpty(),
    body("education").notEmpty(),
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
    ];

    DB.getConnection((err, conn) => {
      if (err) {
        res.json({ err: err, data: "DB connection error" });
        return;
      }

      conn.query(
        `INSERT INTO interns_present_interns_details (fname, lname, leader, profile, phone, email, education, duration_month, starting_date, ending_date) values (?)`,
        [mdata],
        (err, result) => {
          if (err) {
            res.json({ error: err });
            conn.release();
          }
          res.json({ msg: "Data inserted Successfully" });
          conn.release();
        },
      );
    });
  },
);

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(
      `UPDATE interns_present_interns_details SET ? where id = ${id}`,
      [req.body],
      (err, data) => {
        if (err) {
          res.json({ error: err });
          conn.release();
        }
        res.json({ msg: "Data Edited Successfully", data: data });
        conn.release();
      },
    );
  });
});

router.post("/:id", (req, res) => {
  const { remarks, certificate, lor } = req.body;
  const args = [req.params.id, certificate, lor, remarks];
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(`CALL Delete_Present_Intern(?)`, [args], (err) => {
      if (err) {
        res.json({ error: err });
        conn.release();
      }
      res.json({ msg: "Data removed successfully!" });
      conn.release();
    });
  });
});

module.exports = router;

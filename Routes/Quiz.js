const express = require("express");
const router = express();
const DB = require("../DB");

router.get("/:subject/:cls", (req, res) => {
  const { subject, cls } = req.params;
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(
      `SELECT * FROM interns_quiz where subject="${subject}" and class=${cls} order by RAND() limit 10`,
      (err, result) => {
        if (err) {
          res.json({ error: err });
        }
        if (result.length < 10)
          return res.json({ message: "No sufficient Questions" });
        res.json({ data: result });
        conn.release();
      },
    );
  });
});

router.post("/", (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }

    const {
      question,
      option1,
      option2,
      option3,
      option4,
      subject,
      class: cls,
      chapter,
      difficulty,
    } = req.body;
    conn.query(
      `insert into interns_quiz (question,option1,option2,option3,option4,subject,class,chapter,difficulty) values (?,?,?,?,?,?,?,?,?)`,
      [
        question,
        option1,
        option2,
        option3,
        option4,
        subject,
        cls,
        chapter,
        difficulty,
      ],
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
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(
      `UPDATE interns_quiz SET ? where id = ?`,
      [req.body, id],
      (err, data) => {
        if (err) {
          res.json({ error: err });
          conn.release();
        }
        res.json({ msg: "Data Edited Successfully" });
        conn.release();
      },
    );
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  DB.getConnection((err, conn) => {
    if (err) {
      res.json({ err: err, data: "DB connection error" });
      return;
    }
    conn.query(`delete from interns_quiz where id = ?`, [id], (err, data) => {
      if (err) {
        res.json({ error: err });
        conn.release();
      }
      res.json({ msg: "Data Deleted Successfully" });
      conn.release();
    });
  });
});

module.exports = router;

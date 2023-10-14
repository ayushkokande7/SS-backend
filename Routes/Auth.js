const express = require("express");
const DB = require("../DB");
const router = express();
const { body, validationResult } = require("express-validator");
const Auth = require("./Middleware");
const jwt = require("jsonwebtoken");

router.get("/", Auth, (req, res) => {
  DB.getConnection((err, conn) => {
    if (err) {
      return res.json({ err: err, data: "DB connection error" });
    }
    var date = new Date().toISOString();
    conn.query(
      `update interns_leaders set last_active_date=? where id = ?`,
      [date, req.user.id],
      (err) => {
        if (err) {
          res.json({ err: err, data: "DB connection error" });
          return;
        }
      },
    );
    conn.release();
  });
  const user = req.user;
  res.json({ valid: true, data: user });
});

router.post(
  "/",
  [body("username").notEmpty(), body("password").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    DB.getConnection((err, conn) => {
      if (err) {
        return res.json({ err: err, data: "DB connection error" });
      }
      conn.query(
        `select id,fname,image,leading_department,admin from interns_leaders where username = ? and BINARY password = ? `,
        [req.body.username, req.body.password],
        (err, rers) => {
          if (err) {
            return res.json({ err: err, data: "DB connection error" });
          }
          if (rers.length > 0) {
            const payload = {
              user: rers[0],
            };
            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              { expiresIn: "16h" }, // Change to 3600 during production
              (err, token) => {
                if (err) throw err;
                res.status(200).json({ success: true, data: rers[0], token });
              },
            );
          } else {
            return res
              .status(500)
              .json({ success: false, data: "Invalid username and password" });
          }
        },
      );
      conn.release();
    });

    DB.getConnection((err, conn) => {
      if (err) {
        return res.json({ err: err, data: "DB connection error" });
      }
      var date = new Date().toISOString();
      conn.query(
        `update interns_leaders set last_active_date=? where username = ? and password = ?`,
        [date, req.body.username, req.body.password],
        (err) => {
          if (err) {
            res.json({ err: err, data: "DB connection error" });
            return;
          }
        },
      );
    });
  },
);

module.exports = router;

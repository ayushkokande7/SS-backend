const express = require("express");
const { mainDB: DB } = require("../DB");
const router = express();
const { body, validationResult } = require("express-validator");
const Auth = require("./Middleware");
const jwt = require("jsonwebtoken");

router.get("/auth", Auth, (req, res) => {
  res.json(req.user);
});

router.post("/", (req, res) => {
  if (req.body.name === "ankit") {
    const payload = {
      user: {
        name: req.body.name,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "16h" }, // Change to 3600 during production
      (err, token) => {
        if (err) throw err;
        req.session.token = token;
        res.json(token);
      },
    );
  } else {
    res.json("invalid");
  }
});

// Access the session as req.session
router.get("/", function (req, res) {
  if (!req.session.token) {
    return res.json("fail");
  }
  req.session.token = "token";
  res.json("done");
});

// router.get("/", (req, res) => {
//   DB.getConnection((err, conn) => {
//     if (err) {
//       res.json({ err: err, data: "DB connection error" });
//       return;
//     }
//     conn.query(
//       `SELECT * FROM interns_not_seleced_interns_details order by id desc`,
//       (err, result) => {
//         if (err) {
//           res.json({ error: err });
//         }
//         if (result.length === 0) {
//           res.status(400).json({ err: "NULL" });
//         } else res.json({ data: result });
//         conn.release();
//       }
//     );
//   });
// });

// router.post(
//   "/",
//   [
//     body("email").notEmpty(),
//     body("education").notEmpty(),
//     body("reason_for_not_selected").notEmpty(),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,

//         error: "All fields are required",
//       });
//     }
//     const {
//       fname,
//       lname,
//       profile,
//       phone,
//       email,
//       education,
//       reason_for_not_selected,
//     } = req.body;

//     const mdata = [
//       fname,
//       lname,
//       profile,
//       phone,
//       email,
//       education,
//       reason_for_not_selected,
//     ];

//     DB.getConnection((err, conn) => {
//       if (err) {
//         res.json({ err: err, data: "DB connection error" });
//         return;
//       }

//       conn.query(
//         `INSERT INTO interns_not_seleced_interns_details (fname, lname, profile, phone, email, education, reason_for_not_selected) values (?)`,
//         [mdata],
//         (err, result) => {
//           if (err) {
//             res.json({ error: err });
//             conn.release();
//           }
//           res.json({ msg: "Data inserted Successfully", data: result });
//           conn.release();
//         }
//       );
//     });
//   }
// );

// router.patch("/:id", (req, res) => {
//   const id = req.params.id;
//   DB.getConnection((err, conn) => {
//     if (err) {
//       res.json({ err: err, data: "DB connection error" });
//       return;
//     }
//     conn.query(
//       `UPDATE interns_not_seleced_interns_details SET ? where id = ${id}`,
//       [req.body],
//       (err, data) => {
//         if (err) {
//           res.json({ error: err });
//           conn.release();
//         }
//         res.json({ msg: "Data Edited Successfully", data: data });
//         conn.release();
//       }
//     );
//   });
// });

module.exports = router;

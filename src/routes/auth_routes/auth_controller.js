const { courseDB: DB } = require("../../../DB");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const email_config = nodemailer.createTransport({
  port: 465,
  host: "smtp.hostinger.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await DB.query(
      "SELECT user_id, fname, lname, email, phone,dob,gender,verified FROM users WHERE email = ? AND BINARY password = ?",
      [email, password],
    );
    if (rows.length == 0) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    if (rows[0].verified == 0) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      const [rows] = await DB.query(`UPDATE users set otp=? where email=?`, [
        OTP,
        email,
      ]);
      if (rows.affectedRows == 0) {
        return res
          .status(500)
          .json({ message: "something went wrong, try again" });
      }
      const mailData = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "studifysuccess",
        text: "Enter this OTP for verify your Email",
        html: `Ennter this OTP for verify your Email <br/>
            <h3><b>${OTP}</b></h3>`,
      };
      email_config.sendMail(mailData, async (err, info) => {
        if (err) {
          // console.log("error", err);
          res
            .status(501)
            .json({ message: "Somethig went wrong try again later" });
        }
        res.status(201).json({
          message: "Please verify your Email \nOTP has been send to your Email",
        });
        // console.log("success", info);
      });
    } else {
      const payload = {
        user: rows[0].email,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "180d" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ data: rows[0], token: token });
        },
      );
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const signup = async (req, res) => {
  try {
    const { fname, lname, email, phone, password, dob, gender } = req.body;
    const [rows] = await DB.query(
      "select count(*) as count from users where email = ?",
      [email],
    );
    if (rows[0].count == 0) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      const [rows] = await DB.query(
        `INSERT INTO users (fname, lname, email, phone, password,dob,gender,otp) VALUES (?, ?, ?, ?, ?,?,?,?)`,
        [fname, lname, email, phone, password, dob, gender, OTP],
      );
      if (rows.affectedRows == 0) {
        return res
          .status(500)
          .json({ message: "something went wrong, try again" });
      }
      const mailData = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "studifysuccess",
        text: "Enter this OTP to verify your Email",
        html: `Enter this OTP to verify your Email <br/>
              <h3><b>${OTP}</b></h3>`,
      };

      email_config.sendMail(mailData, async (err, info) => {
        if (err) {
          // console.log("error", err);
          await DB.query(`delete table users where id = ?`, [rows.insertId]);
          return res.status(501).json({
            message: "Somethig went wrong try again later",
          });
        }
        res.status(201).json({ message: "OTP has been send to your Email " });
        // console.log("success", info);
      });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const forgot_password = async (req, res) => {
  try {
    const { email } = req.body;
    const [rows] = await DB.query(
      "select count(*) as count from users where email = ?",
      [email],
    );

    if (rows[0].count !== 1) {
      return res.status(400).json({ message: "Invalid Email" });
    } else {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      const [rows] = await DB.query(`UPDATE users set otp=? where email=?`, [
        OTP,
        email,
      ]);
      if (rows.affectedRows == 0) {
        return res
          .status(500)
          .json({ message: "something went wrong, try again" });
      }
      const mailData = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "studifysuccess",
        text: "Enter this OTP to reset your password",
        html: `Enter this OTP to reset your password <br/>
            <h3><b>${OTP}</b></h3>`,
      };
      email_config.sendMail(mailData, async (err, info) => {
        if (err) {
          // console.log("error", err);
          res
            .status(501)
            .json({ message: "Somethig went wrong try again later" });
        }
        res.status(201).json({ message: "OTP has been send to your Email" });
        // console.log("success", info);
      });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const verify_otp = async (req, res) => {
  try {
    const { otp, email, type } = req.body;
    const [rows] = await DB.query(`select otp from users where email=?`, [
      email,
    ]);
    if (rows[0].otp == otp) {
      if (type) {
        const [rows] = await DB.query(
          `update users set verified=1 where email=?`,
          [email],
        );
        if (rows.affectedRows == 0) {
          return res
            .status(500)
            .json({ message: "something went wrong, try again" });
        }
        return res
          .status(200)
          .json({ message: "Email address has been verified!" });
      } else {
        return res.status(200).json({ message: "OTP in verified!" });
      }
    }
    return res.status(400).json({ message: "The OTP you entered is invalid" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const reset_password = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await DB.query(
      "update users set password=? where email = ?",
      [password, email],
    );
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ message: "Your password has been changed!" });
    }
    res.status(500).json({ message: "Server error, try again later" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  signin,
  signup,
  forgot_password,
  reset_password,
  verify_otp,
};

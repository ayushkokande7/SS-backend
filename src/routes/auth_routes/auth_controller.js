const { courseDB: DB } = require("../../../DB");
const emailConfig = require("../../utils/emailConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyEmail, resetPassword, welcome } = require("../../emailTemplates");
const generateOTP = require("../../utils/generateOTP");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await DB.query(
      "SELECT user_id, fname, lname, email,verified,password FROM users WHERE email = ?",
      [email]
    );
    if (rows.length == 0) {
      return res.Response(400, "Invalid Email or Password", null);
    }
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.Response(400, "Invalid Email or Password", null);
    if (rows[0].verified == 0) {
      const OTP = generateOTP();
      const [rows] = await DB.query(`UPDATE users set otp=? where email=?`, [
        OTP,
        email,
      ]);
      if (rows.affectedRows == 0) {
        return res.Response(500, "Somethig went wrong", null);
      }
      emailConfig.sendMail(verifyEmail(email, OTP), async (err, info) => {
        if (err) {
          // console.log("error", err);
          return res.Response(501, "Somethig went wrong", null);
        }
        return res.Response(
          201,
          "Please verify your Email \nOTP has been send to your Email",
          null
        );
      });
    } else {
      const payload = {
        user: rows[0].user_id,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "30d" },
        (err, token) => {
          if (err) throw err;
          const user = {
            fname: rows[0].fname,
            lname: rows[0].lname,
            email: rows[0].email,
          };
          return res.Response(200, null, { user, token });
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.Response(500, "Something went wrong", null);
  }
};

const signup = async (req, res) => {
  try {
    const { fname, lname, email, phone, password, dob, gender } = req.body;
    const [rows] = await DB.query(
      "select count(*) as count from users where email = ? or phone = ?",
      [email, phone]
    );
    if (rows[0].count == 0) {
      const OTP = generateOTP();
      const hashedPassword = await bcrypt.hash(password, 10);
      const [rows] = await DB.query(
        `INSERT INTO users (fname, lname, email, phone, password,dob,gender,otp) VALUES (?, ?, ?, ?, ?,?,?,?)`,
        [fname, lname, email, phone, hashedPassword, dob, gender, OTP]
      );
      if (rows.affectedRows == 0) {
        return res.Response(500, "Something went wrong", null);
      }

      emailConfig.sendMail(verifyEmail(email, OTP), async (err, info) => {
        if (err) {
          return res.Response(
            500,
            "Something went wrong! try again later",
            null
          );
        }
        return res.Response(200, "Verify your Email address", null);
      });
    } else {
      return res.Response(
        400,
        "Email or Phone number is already registered",
        null
      );
    }
  } catch (error) {
    return res.Response(500, "Something went wrong", null);
  }
};

const send_otp = async (req, res) => {
  try {
    const { email } = req.body;
    const [rows] = await DB.query(
      "select count(*) as count from users where email = ?",
      [email]
    );

    if (rows[0].count !== 1) {
      return res.Response(400, "This Email is not registered", null);
    } else {
      const OTP = generateOTP();
      const [rows] = await DB.query(`UPDATE users set otp=? where email=?`, [
        OTP,
        email,
      ]);
      if (rows.affectedRows == 0) {
        return res.Response(500, "Something went wrong", null);
      }
      emailConfig.sendMail(resetPassword(email, OTP), async (err, info) => {
        if (err) {
          // console.log("error", err);
          return res.Response(500, "Something went wrong", null);
        }
        return res.Response(200, "OTP has been send to your email", null);
        // console.log("success", info);
      });
    }
  } catch (error) {
    return res.Response(500, "Something went wrong", null);
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
          [email]
        );
        if (rows.affectedRows == 0) {
          return res.Response(500, "Something went wrong", null);
        }
        emailConfig.sendMail(welcome(email));
        return res.Response(200, "Email address has been verified", null);
      } else {
        return res.Response(200, "OTP is verified", null);
      }
    }
    return res.Response(400, "Invalid OTP", null);
  } catch (error) {
    return res.Response(500, "Something went wrong", null);
  }
};

const reset_password = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await DB.query(
      "update users set password=? where email = ? and otp = ?",
      [hashedPassword, email, otp]
    );
    if (rows.affectedRows == 1) {
      return res.Response(200, "Your password has been changed!", null);
    }
    return res.Response(500, "Something went wrong! try again later", null);
  } catch (error) {
    return res.Response(500, "Something went wrong", null);
  }
};

module.exports = {
  signin,
  signup,
  send_otp,
  reset_password,
  verify_otp,
};

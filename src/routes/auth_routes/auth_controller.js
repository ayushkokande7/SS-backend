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
      "SELECT user_id, fname, lname, email,verified FROM users WHERE email = ? AND BINARY password = ?",
      [email, password],
    );
    if (rows.length == 0) {
      return res.Response(400, "Invalid Email or Password", null);
    }
    if (rows[0].verified == 0) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      const [rows] = await DB.query(`UPDATE users set otp=? where email=?`, [
        OTP,
        email,
      ]);
      if (rows.affectedRows == 0) {
        return res.Response(500, "Somethig went wrong", null);
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
          return res.Response(501, "Somethig went wrong", null);
        }
        return res.Response(
          201,
          "Please verify your Email \nOTP has been send to your Email",
          null,
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
          // res.status(200).json({ data: user, token: token });
          return res.Response(200, null, { user, token });
        },
      );
    }
  } catch (error) {
    res.Response(500, "Something went wrong", null);
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
        return res.Response(500, "Something went wrong", null);
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
          return res.Response(500, "Something went wrong", null);
        }
        return res.Response(200, "Verify your Email address", null);
      });
    } else {
      return res.Response(400, "Email is already registered", null);
    }
  } catch (error) {
    return res.Response(500, "Something went wrong", null);
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
      return res.Response(400, "Invalid Email", null);
    } else {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      const [rows] = await DB.query(`UPDATE users set otp=? where email=?`, [
        OTP,
        email,
      ]);
      if (rows.affectedRows == 0) {
        return res.Response(500, "Something went wrong", null);
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
          [email],
        );
        if (rows.affectedRows == 0) {
          return res.Response(500, "Something went wrong", null);
        }
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
    const { email, password } = req.body;
    const [rows] = await DB.query(
      "update users set password=? where email = ?",
      [password, email],
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
  forgot_password,
  reset_password,
  verify_otp,
};

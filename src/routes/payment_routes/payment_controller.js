const { courseDB: DB } = require("../../../DB");
const emailConfig = require("../../utils/emailConfig");
const { payment } = require("../../emailTemplates");

const createPayment = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { course_id, amount, payment_id } = req.body;
    const [rows] = await DB.query(
      `INSERT INTO payment (user_id, course_id, amount, transaction_id) VALUES (?, ?, ?, ?)`,
      [user_id, course_id, amount, payment_id]
    );
    const irow = rows.insertId;
    if (rows.affectedRows == 0) {
      return res.Response(500, "Something went wrong", null);
    } else {
      const [rows] = await DB.query(
        `select c.course_name,c.instructor_name,p.amount,p.transaction_id,p.date,u.email from course c join payment p on p.course_id = c.course_id
        join users u on u.user_id = p.user_id where p.payment_id = ?`,
        [irow]
      );
      emailConfig.sendMail(
        payment(
          rows[0].email,
          rows[0].course_name,
          rows[0].instructor_name,
          rows[0].amount,
          rows[0].transaction_id,
          rows[0].date
        )
      );
      await DB.query(`INSERT INTO progress (user_id,course_id) values (?,?)`, [
        user_id,
        course_id,
      ]);
      return res.Response(200, "Payment Successful", null);
    }
  } catch (error) {
    console.log(error);
    res.Response(500, "Payment Failed", null);
  }
};

const getPayment = async (req, res) => {
  try {
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `SELECT p.*,c.course_name,c.image FROM payment p JOIN course c on p.course_id = c.course_id WHERE p.user_id = ?`,
      [user_id]
    );
    res.Response(200, null, rows);
  } catch {
    // res.Response(500, "Something went wrong", null);
  }
};

module.exports = {
  createPayment,
  getPayment,
};

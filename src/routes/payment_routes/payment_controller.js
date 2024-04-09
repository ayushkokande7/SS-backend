const { courseDB: DB } = require("../../../DB");

const createPayment = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { course_id, amount, payment_id } = req.body;
    const [rows] = await DB.query(
      `INSERT INTO payment (user_id, course_id, amount, transaction_id) VALUES (?, ?, ?, ?)`,
      [user_id, course_id, amount, payment_id],
    );
    if (rows.affectedRows == 0) {
      return res.Response(500, "Something went wrong", null);
    } else {
      const [rows] = await DB.query(
        `INSERT INTO progress (user_id,course_id) values (?,?)`,
        [user_id, course_id],
      );
      if (rows.affectedRows == 0)
        return res.Response(500, "Something went wrong", null);
      return res.Response(200, "Payment Successful", null);
    }
  } catch {
    res.Response(500, "Payment Failed", null);
  }
};

const getPayment = async (req, res) => {
  try {
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `SELECT p.*,c.course_name,c.image FROM payment p JOIN course c on p.course_id = c.course_id WHERE p.user_id = ?`,
      [user_id],
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

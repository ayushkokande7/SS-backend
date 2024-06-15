const { courseDB: DB } = require("../../../DB");

const get_user = async (req, res) => {
  try {
    const [rows] = await DB.query(
      "select fname,lname,email,phone,gender,dob from users where user_id=?",
      [req.user_id]
    );
    res.Response(200, null, rows[0]);
  } catch (error) {
    res.Response(401, "Access Denite", null);
  }
};

const change_password = async (req, res) => {
  try {
    const { cpassword, password } = req.body;
    const [rows] = await DB.query(
      "UPDATE users SET password = ? WHERE user_id = ? AND password = ?",
      [cpassword, req.user_id, password]
    );
    if (!rows.affectedRows)
      return res.Response(400, "Current password is incorrect", null);
    res.Response(200, "Password cheanged successfully", null);
  } catch (error) {
    res.Response(500, "something went wrong", null);
  }
};

const update_profile = async (req, res) => {
  try {
    const [rows] = await DB.query("UPDATE users SET ? WHERE user_id = ?", [
      req.body,
      req.user_id,
    ]);
    if (!rows.affectedRows)
      return res.Response(400, "something went wrong", null);
    res.Response(200, "Profile updated successfully", null);
  } catch (error) {
    res.Response(500, "something went wrong", null);
  }
};

const check_app_version = async (req, res) => {
  try {
    const date = new Date().toLocaleString();
    await DB.query(`update users set last_seen = ? where user_id = ?`, [
      date,
      req.user_id,
    ]);

    const [rows] = await DB.query(
      `select version from app_version order by id desc limit 1`
    );
    res.Response(200, null, rows[0]);
  } catch (error) {}
};

const report_BUG = async (req, res) => {
  try {
    const [rows] = await DB.query(
      `insert into report_app_issue (user_id,description) values (?,?)`,
      [req.user_id, req.body.desc]
    );
    if (rows.affectedRows == 1)
      return res.Response(200, "Your message has been send!", null);
    return res.Response(500, "Something went worong", null);
  } catch (error) {}
};

module.exports = {
  change_password,
  update_profile,
  get_user,
  check_app_version,
  report_BUG,
};

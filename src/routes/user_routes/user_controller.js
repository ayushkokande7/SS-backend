const { courseDB: DB } = require("../../../DB");

const change_password = async (req, res) => {
  try {
    const { cpassword, password, id } = req.body;
    const [rows] = await DB.query(
      "UPDATE users SET password = ? WHERE id = ? AND password = ?",
      [password, id, cpassword],
    );
    if (!rows.affectedRows)
      return res
        .status(400)
        .json({ message: "Your current password is wrong" });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const update_profile = async (req, res) => {};

module.exports = {
  change_password,
  update_profile,
};

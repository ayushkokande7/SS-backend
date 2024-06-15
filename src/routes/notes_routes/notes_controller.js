const { courseDB: DB } = require("../../../DB");

const serch_notes = async (req, res) => {
  try {
    const { cls, sub } = req.query;
    const [rows] = await DB.query(
      `SELECT * from notes where class = ? or subject = ?`,
      [cls, sub]
    );
    if (rows[0]) {
      return res.Response(200, null, rows);
    }
    res.Response(200, "No Notes Found");
  } catch {}
};

module.exports = {
  serch_notes,
};

const { courseDB: DB } = require("../../../DB");

const search_notes = async (req, res) => {
  try {
    const { cls } = req.query;
    const [rows] = await DB.query(
      `SELECT * from notes where class = ? order by chapter_no`,
      [cls]
    );
    if (rows[0]) {
      return res.Response(200, null, rows);
    }
    res.Response(200, null, []);
  } catch {}
};

module.exports = {
  search_notes,
};

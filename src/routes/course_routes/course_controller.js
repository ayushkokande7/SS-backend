const { courseDB: DB } = require("../../../DB");

const all_courses = async (req, res) => {
  try {
    const [rows] = await DB.query("SELECT * from users");
    res.json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};

const course = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await DB.query("SELECT * from course where course_id = ?;", [
      id,
    ]);
    res.json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};

const course_curriculum = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await DB.query(
      "SELECT c.course_name, s.section_title, cu.curriculum_item_title FROM course c JOIN sections s ON c.course_id = s.course_id JOIN curriculum cu ON s.section_id = cu.section_id where c.course_id = ?;",
      [id],
    );
    const sections = {};
    rows.forEach((item) => {
      if (!sections[item.section_title]) {
        sections[item.section_title] = [];
      }
      sections[item.section_title].push(item.curriculum_item_title);
    });
    res.json({ data: sections });
  } catch (error) {
    console.log(error);
  }
};

const course_reviews = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await DB.query(
      "SELECT s.fname ,r.review ,r.ratings FROM course c JOIN reviews r ON c.course_id = r.course_id Join users s ON r.user_id = s.user_id where r.course_id = ?;",
      [id],
    );
    res.json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  all_courses,
  course,
  course_curriculum,
  course_reviews,
};

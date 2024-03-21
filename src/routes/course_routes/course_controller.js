const { courseDB: DB } = require("../../../DB");

const popular_courses = async (req, res) => {
  try {
    const [rows] = await DB.query(
      "SELECT * from course where popularity_trend = 'popular' and is_visible=1 limit 5",
    );
    res.Response(200, null, rows);
  } catch (error) {}
};

const trending_courses = async (req, res) => {
  try {
    const [rows] = await DB.query(
      "SELECT * from course where popularity_trend = 'trending' and is_visible=1 limit 5",
    );
    res.Response(200, null, rows);
  } catch (error) {}
};

const find_course = async (req, res) => {
  try {
    const { name } = req.params;
    const [rows] = await DB.query(
      `SELECT * from course where course_name like '%${name}%' and is_visible=1;`,
    );
    res.Response(200, null, rows);
  } catch (error) {}
};

const completed_courses = async (req, res) => {
  try {
    // const user_id = req.user_id;
    const user_id = 8;
    const { course_id } = req.body;
    const [rows] = await DB.query(
      `select c.course_id,c.course_name,c.categories,c.image,c.lectures,c.duration,
      p.lecture_completed,e.date,e.certificate from enrollment e
      JOIN course c ON e.course_id=c.course_id
      JOIN progress p ON e.progress_id=p.progress_id 
      where e.user_id = ? and e.is_completed=1;`,
      [user_id],
    );
    res.Response(200, null, rows);
  } catch (error) {}
};

const pending_courses = async (req, res) => {
  try {
    // const user_id = req.user_id;
    const user_id = 8;
    const { course_id } = req.body;
    const [rows] = await DB.query(
      `select c.course_id,c.course_name,c.categories,c.image,c.lectures,c.duration,
      p.lecture_completed,e.date from enrollment e
      JOIN course c ON e.course_id=c.course_id
      JOIN progress p ON e.progress_id=p.progress_id 
      where e.user_id = ? and e.is_completed=0;`,
      [user_id],
    );
    res.Response(200, null, rows);
  } catch (error) {
    console.log(error);
  }
};

const course_curriculum = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await DB.query(
      `SELECT
      s.section_title,
      s.section_duration,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'id',l.lecture_count,
              'title', l.title,
              'video', l.video,
              'duration',l.duration
          )order by l.lecture_count
      ) 
      AS lectures
  FROM
      course c
  JOIN
      sections s ON c.course_id = s.course_id
  JOIN
      lectures l ON s.section_id = l.section_id
  WHERE
      c.course_id = ?
  GROUP BY
      s.section_id;`,
      [id],
    );
    res.Response(200, null, rows);
  } catch (error) {
    console.log(error);
  }
};

const course_reviews = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await DB.query(
      `SELECT s.fname ,r.review ,r.ratings FROM course c JOIN reviews r ON c.course_id = r.course_id Join users s ON r.user_id = s.user_id where r.course_id = ?;`,
      [id],
    );
    res.Response(200, null, rows);
  } catch (error) {
    console.log(error);
  }
};

const add_review = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { course_id, rating, message } = req.body;
    const [rows] = await DB.query(
      `insert into reviews course_id,user_id,review,ratings values(?,?,?,?)`,
      [course_id, user_id, message, rating],
    );
    if (rows.affectedRows == 1) {
      res.Response(200, "Review added successfully", null);
    } else {
      res.Response(500, "Cannot add review", null);
    }
  } catch (error) {
    res.Response(200, "Something went wrong", null);
  }
};

const get_favourite = async (req, res) => {
  try {
    // const user_id = req.user_id;
    const user_id = 8;
    const [rows] = await DB.query(
      `SELECT c.course_id, c.course_name, c.categories,c.ratings,
       c.duration,c.image,f.favourite_id
      from course c,favourites f where c.course_id = f.course_id and user_id = ? and is_visible = 1`,
      [user_id],
    );
    res.Response(200, null, rows);
  } catch (error) {
    console.log(error);
  }
};

const add_favourite = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { course_id } = req.body;
    const [rows] = await DB.query(
      `insert into favourites course_id,user_id values(?,?)`,
      [course_id, user_id],
    );
    if (rows.affectedRows == 1) {
      res.Response(200, "Added to favourite", null);
    } else {
      res.Response(500, "Cannot added to favourite", null);
    }
  } catch (error) {
    res.Response(500, "Somethig went wrong", null);
  }
};

const update_progress = async (req, res) => {
  try {
    // const user_id = req.user_id;
    const user_id = 8;
    const { course_id, progress } = req.body;
    const [rows] = await DB.query(
      `select lecture_completed from progress where user_id = ? and course_id=?`,
      [user_id, course_id],
    );
    if (rows.lecture_completed < progress) {
      const [rows] = await DB.query(
        `UPDATE progress set lecture_completed = ? where user_id = ? and course_id=?`,
        [progress, user_id, course_id],
      );
      if (rows.affectedRows == 1) {
        return res.Response(200, "Next Lecture Opened", null);
      } else {
        res.Response(500, "Faild to update progress", null);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  popular_courses,
  trending_courses,
  find_course,
  course_curriculum,
  course_reviews,
  add_review,
  update_progress,
  completed_courses,
  pending_courses,
  get_favourite,
  add_favourite,
};

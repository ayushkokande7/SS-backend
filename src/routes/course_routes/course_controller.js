const { courseDB: DB } = require("../../../DB");

const trends_course = async (req, res) => {
  try {
    const { trend } = req.params;
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `SELECT c.course_id, c.course_name, c.categories,c.ratings,c.image,c.instructor_name,
      c.course_description,c.duration,f.favourite_id,c.price,c.fake_price,c.students_enrolled,p.payment_id
      FROM course c
      LEFT JOIN favourites f ON 
      f.user_id = ? AND c.course_id = f.course_id 
      LEFT JOIN payment p on p.user_id = ?
      AND p.course_id = c.course_id 
      WHERE 
      c.popularity_trend = ? AND 
      c.is_visible = 1 LIMIT 5;`,
      [user_id, user_id, trend],
    );
    res.Response(200, null, rows);
  } catch (error) {}
};

const live_class = async (req, res) => {
  try {
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `select * from live_class_enrollment l JOIN 
      live_class c ON l.live_class_id = c.id where user_id = ? and c.is_visible = 1;`,
      [user_id],
    );
    res.Response(200, null, rows);
  } catch (error) {
    console.log(error);
  }
};

const find_course = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { name } = req.params;
    const [rows] = await DB.query(
      `SELECT c.course_id, c.course_name, c.categories,c.ratings,c.image,
      c.duration,f.favourite_id,c.price,c.fake_price,c.students_enrolled,c.instructor_name,
      c.course_description
      FROM course c LEFT JOIN favourites f ON f.user_id = ? AND
      c.course_id = f.course_id where c.course_name like '%${name}%' and c.is_visible=1;`,
      [user_id],
    );
    res.Response(200, null, rows);
  } catch (error) {}
};

const completed_courses = async (req, res) => {
  try {
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `select c.course_id,c.course_name,c.categories,c.image,c.lectures,c.duration,
      p.lecture_completed,p.certificate from course c
      JOIN progress p ON c.course_id=p.course_id 
      where p.user_id = ? and c.lectures = p.lecture_completed;`,
      [user_id],
    );
    res.Response(200, null, rows);
  } catch (error) {
    // console.log(error);
  }
};
//a
const pending_courses = async (req, res) => {
  try {
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `select c.course_id,c.course_name,c.categories,c.image,c.lectures,c.duration,
      p.lecture_completed from course c 
      JOIN progress p ON c.course_id=p.course_id 
      where p.user_id = ? and c.lectures != p.lecture_completed;`,
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
      `insert into reviews (course_id,user_id,review,ratings) values(?,?,?,?)`,
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
    const user_id = req.user_id;
    const [rows] = await DB.query(
      `SELECT c.course_id, c.course_name, c.categories,c.ratings,
       c.duration,c.image,f.favourite_id,c.price,c.fake_price,c.students_enrolled,c.instructor_name,
       c.course_description
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
      `insert into favourites (course_id,user_id) values(?,?)`,
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

const remove_favourite = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { course_id } = req.body;
    const [rows] = await DB.query(
      `delete from favourites where user_id = ? and course_id = ?`,
      [user_id, course_id],
    );
    if (rows.affectedRows == 1) {
      res.Response(200, "removed from favourite", null);
    } else {
      res.Response(500, "Cannot removed from favourite", null);
    }
  } catch (error) {
    res.Response(500, "Somethig went wrong", null);
  }
};

const update_progress = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { course_id, progress } = req.body;
    const [rows] = await DB.query(
      `select lecture_completed,progress_id from progress where user_id = ? and course_id=?`,
      [user_id, course_id],
    );
    const pid = rows[0].progress_id;
    if (rows[0].lecture_completed < progress) {
      const [rows] = await DB.query(
        `UPDATE progress set lecture_completed = ? where progress_id = ?`,
        [progress, pid],
      );
      if (rows.affectedRows == 1) {
        return res.Response(200, "Next Lecture Opened", null);
      } else {
        return res.Response(500, "Faild to update progress", null);
      }
    }
    res.Response(200, null, null);
  } catch (error) {}
};

const banner = async (req, res) => {
  try {
    const [rows] = await DB.query(
      `select url,image from ads order by ads_id desc limit 1`,
    );
    res.Response(200, null, rows[0]);
  } catch (error) {}
};

module.exports = {
  trends_course,
  find_course,
  course_curriculum,
  course_reviews,
  add_review,
  update_progress,
  completed_courses,
  pending_courses,
  get_favourite,
  add_favourite,
  remove_favourite,
  live_class,
  banner,
};

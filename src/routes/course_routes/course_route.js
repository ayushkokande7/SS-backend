const express = require("express");
const router = express.Router();
const course_controller = require("./course_controller");

router.get("/popular", course_controller.popular_courses);
router.get("/trending", course_controller.trending_courses);
router.get("/search/:name", course_controller.find_course);
router.get("/curriculum/:id", course_controller.course_curriculum);
router.get("/reviews/:id", course_controller.course_reviews);
router.post("/review", course_controller.add_review);
router.post("/progress", course_controller.update_progress);
router.get("/completed_courses", course_controller.completed_courses);
router.get("/pending_courses", course_controller.pending_courses);
router.get("/favourite", course_controller.get_favourite);
router.post("/favourite", course_controller.add_favourite);

module.exports = router;

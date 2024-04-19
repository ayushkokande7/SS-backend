const express = require("express");
const router = express.Router();
const course_controller = require("./course_controller");

router.get("/course/:trend", course_controller.trends_course);
router.get("/search/:name", course_controller.find_course);
router.get("/curriculum/:id", course_controller.course_curriculum);
router.get("/reviews/:id", course_controller.course_reviews);
router.post("/review", course_controller.add_review);
router.post("/progress", course_controller.update_progress);
router.get("/completed", course_controller.completed_courses);
router.get("/pending", course_controller.pending_courses);
router.get("/favourite", course_controller.get_favourite);
router.post("/favourite", course_controller.add_favourite);
router.post("/remove_favourite", course_controller.remove_favourite);
router.get("/live_class", course_controller.live_class);
router.get("/banner", course_controller.banner);
module.exports = router;

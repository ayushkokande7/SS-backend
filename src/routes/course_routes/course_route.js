const express = require("express");
const router = express.Router();
const course_controller = require("./course_controller");
const JWT = require("../../middleware/Jwt");

router.get("/", course_controller.all_courses);
router.get("/:id", course_controller.course);
router.get("/curriculum/:id", course_controller.course_curriculum);
router.get("/reviews/:id", course_controller.course_reviews);

module.exports = router;

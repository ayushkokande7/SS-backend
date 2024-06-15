const express = require("express");
const router = express.Router();
const notes_controller = require("./notes_controller");

router.get("/", notes_controller.serch_notes);

module.exports = router;

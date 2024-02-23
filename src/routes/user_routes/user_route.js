const express = require("express");
const router = express.Router();
const user_controller = require("./user_controller");

router.post("/changepassword", user_controller.change_password);
router.patch("/updateprofile", user_controller.update_profile);

module.exports = router;

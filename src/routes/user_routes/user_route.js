const express = require("express");
const router = express.Router();
const user_controller = require("./user_controller");

router.get("/", user_controller.get_user);
router.post("/changepassword", user_controller.change_password);
router.put("/update", user_controller.update_profile);
router.get("/version", user_controller.check_app_version);
module.exports = router;

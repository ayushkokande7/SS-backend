const express = require("express");
const router = express.Router();
const auth_controller = require("./auth_controller");

router.post("/", auth_controller.signin);
router.post("/signup", auth_controller.signup);
router.post("/sendOtp", auth_controller.send_otp);
router.post("/verifyOtp", auth_controller.verify_otp);
router.post("/resetPassword", auth_controller.reset_password);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth_controller = require("./auth_controller");

router.post("/", auth_controller.signin);
router.post("/signup", auth_controller.signup);
router.post("/forgot", auth_controller.forgot_password);
router.post("/otp", auth_controller.verify_otp);
router.post("/reset", auth_controller.reset_password);

module.exports = router;

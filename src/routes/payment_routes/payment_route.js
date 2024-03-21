const express = require("express");
const router = express.Router();
const payment_controller = require("./payment_controller");

router.get("/", payment_controller.payment);

module.exports = router;

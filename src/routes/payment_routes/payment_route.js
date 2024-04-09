const express = require("express");
const router = express.Router();
const payment_controller = require("./payment_controller");

router.post("/", payment_controller.createPayment);
router.get("/", payment_controller.getPayment);

module.exports = router;

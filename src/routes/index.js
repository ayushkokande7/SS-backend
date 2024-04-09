const express = require("express");
const rootRouter = express.Router();
const JWT = require("../middleware/Jwt");
const auth = require("./auth_routes/auth_route");
const user = require("./user_routes/user_route");
const course = require("./course_routes/course_route");
const payment = require("./payment_routes/payment_route");

const commonResponse = require("../middleware/Response");

rootRouter.use(commonResponse);
rootRouter.use("/auth", auth);
rootRouter.use("/user", JWT, user);
rootRouter.use("/course", JWT, course);
rootRouter.use("/payment", JWT, payment);

module.exports = rootRouter;

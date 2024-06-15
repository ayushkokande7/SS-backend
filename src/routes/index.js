const express = require("express");
const rootRouter = express.Router();
const JWT = require("../middleware/Jwt");
const auth = require("./auth_routes/auth_route");
const user = require("./user_routes/user_route");
const course = require("./course_routes/course_route");
const payment = require("./payment_routes/payment_route");
const notes = require("./notes_routes/notes_route");
const commonResponse = require("../middleware/Response");
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, Please try again after 15 minutes",
});

rootRouter.use(commonResponse);
rootRouter.use("/auth", limiter, auth);
rootRouter.use("/user", JWT, user);
rootRouter.use("/course", JWT, course);
rootRouter.use("/payment", JWT, payment);
rootRouter.use("/notes", JWT, notes);

module.exports = rootRouter;

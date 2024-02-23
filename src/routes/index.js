const express = require("express");
const rootRouter = express.Router();

const auth = require("./auth_routes/auth_route");
const user = require("./user_routes/user_route");
const course = require("./course_routes/course_route");

rootRouter.use("/auth", auth);
rootRouter.use("/user", user);
rootRouter.use("/course", course);

module.exports = rootRouter;

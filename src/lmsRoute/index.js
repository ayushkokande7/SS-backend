const express = require("express");
const rootRouter = express.Router();
const commonResponse = require("../middleware/Response");
const JWT = require("../middleware/Jwt");
const auth = require("./auth_routes/auth_route");
// const user = require("./user_routes/user_route");

rootRouter.use(commonResponse);
rootRouter.use("/auth", auth);
// rootRouter.use("/user", JWT, user);

module.exports = rootRouter;

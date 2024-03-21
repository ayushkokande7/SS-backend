const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user_id = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

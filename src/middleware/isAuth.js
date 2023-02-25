const cookieParser = require("cookie-parser");
const userColl = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "/src/config/config.env" });
exports.isAuthenticatedUser = async (req, res, next) => {
  const token = await req.cookies.token;
  if (!token) {
    res.status(401).json({ success: false, message: "Please Login First" });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = await userColl.findById(decoded.id);
  next();
};

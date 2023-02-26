const userColl = require("../models/user");
const cookieParser = require("cookie-parser");
exports.sendJwt = (user, statusCode, res) => {
  const token = user.getToken();
  // console.log(token);
  const options = {
    httpOnly: true,
    expiresIn: Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
  };
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

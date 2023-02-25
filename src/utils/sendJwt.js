const userColl = require("../models/user");
exports.sendJwt = (user, statusCode, res) => {
  const token = user.getToken;
  const options = {
    httpOnly: true,
    expiresIn: Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
  };

  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

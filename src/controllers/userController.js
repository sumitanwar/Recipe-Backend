const userColl = require("../models/user");
const { sendJwt } = require("../utils/sendJwt");
const bcrypt = require("bcryptjs");

// New User Registeration
exports.userRegisteration = async (req, res, next) => {
  const { name, email, password, cPassword } = req.body;

  if (password !== cPassword) {
    return res
      .status(403)
      .json({ success: false, message: "Password Does Not Matched" });
  }
  const isExistingUser = await userColl.findOne({ email });
  if (isExistingUser) {
    return res
      .status(500)
      .json({ success: false, message: "Email id already registered" });
  }
  const user = await userColl.create(req.body);
  try {
    sendJwt(user, 200, res);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// User Log In
exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({
      success: false,
      message: "Password and Email are mandetory.",
    });
  }
  const user = await userColl.findOne({ email }).select("+password");
  // console.log(user.password);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User Does Not Exist" });
  }
  const isPassMatched = await bcrypt.compare(password, user.password);
  console.log(isPassMatched);
  if (!isPassMatched) {
    return res
      .status(404)
      .json({ success: false, message: "User email or password invalid" });
  }
  // console.log(user.getToken);
  try {
    sendJwt(user, 200, res);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// User LogOut
exports.userLogout = async (req, res, next) => {
  const options = { httpOnly: true, expiresIn: Date.now() };
  res
    .status(200)
    .cookie("token", "", options)
    .json({ success: true, message: "Logged Out Successfully" });
};

const express = require("express");
const {
  userRegisteration,
  userLogin,
  userLogout,
} = require("../controllers/userController");
const Router = express.Router();

Router.route("/user/registeration").post(userRegisteration);

Router.route("/user/login").post(userLogin);
Router.route("/user/logout").post(userLogout);

module.exports = Router;

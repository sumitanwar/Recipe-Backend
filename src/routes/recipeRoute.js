const express = require("express");
const {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
  upDateRecipe,
  DeleteRecipe,
} = require("../controllers/recipeController");
const { isAuthenticatedUser } = require("../middleware/isAuth");
const Router = express.Router();

Router.route("/recipes/create").post(isAuthenticatedUser, createRecipe);
Router.route("/recipes").get(getAllRecipe);
Router.route("/recipes/:id").get(getSingleRecipe);
Router.route("/recipes/update").put(isAuthenticatedUser, upDateRecipe);
Router.route("/recipes/delete").delete(isAuthenticatedUser, DeleteRecipe);
module.exports = Router;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const recipeSchema = new Schema({
  title: { type: String, required: [true, "Please Enter Recipe Title"] },
  author: {
    type: String,
    required: [true, "Enter Author Name"],
    minLength: [4, "Author should have atleast 4 character"],
    maxLength: [30, "Author should have atmost 30 character"],
  },
  image: {
    url: { type: String, required: [true, "Must have image url"] },
    imgname: { type: String, required: true },
  },
  ingredients: [{ type: String, required: [true, "Enter Ingredients"] }],
  directions: {
    type: String,
    required: [true, "Enter Direction to make a recipe"],
  },
  user: { type: mongoose.Schema.ObjectId, required: true, ref: "users" },
});

const recipeColl = mongoose.model("recipes", recipeSchema);
module.exports = recipeColl;

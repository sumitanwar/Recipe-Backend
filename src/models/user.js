const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
  name: { type: String, required: [true, "Please Enter Name"] },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter Password"],
    minLength: [6, "Password should have atleast 6 character"],
    maxLength: [15, "Password should have atmost 15 character"],
  },
});

UserSchema.methods.getToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRE,
  });
  return token;
};
UserSchema.pre("save", async function () {
  this.password = bcrypt.hash(this.password, 10);
});
const userColl = mongoose.model("users", UserSchema);
module.exports = userColl;

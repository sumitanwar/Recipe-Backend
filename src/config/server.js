const mongoose = require("mongoose");
require("dotenv").config();
function Server() {
  // const URI = process.env.URL_DB || "mongodb://127.0.0.1:27017/Recipe";
  const URI =
    "mongodb+srv://sumitku70:12345@cluster0.0gkbz0l.mongodb.net/recipes?retryWrites=true&w=majority";
  mongoose.set("strictQuery", false);
  //   mongoose.set("strictQuery", true);
  mongoose.connect(URI, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Connected to DB");
  });
}
module.exports = Server;

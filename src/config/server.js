const mongoose = require("mongoose");
require("dotenv").config();
function Server() {
  const URI = "mongodb+srv://sumitku70:<password>@cluster0.0gkbz0l.mongodb.net/?retryWrites=true&w=majority";
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

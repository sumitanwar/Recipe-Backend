const mongoose = require("mongoose");
require("dotenv").config();
function Server() {
  const URI = process.env.URL_DB;
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

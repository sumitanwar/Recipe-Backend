const express = require("express");
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Server = require("./src/config/server");
const recipeRouter = require("./src/routes/recipeRoute");
const userRouter = require("./src/routes/userRoute");
require("dotenv").config({ path: "./src/config/config.env" });
Server();
const Port = 5500;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(fileupload({ useTempFiles: true }));
app.use("/api/v1", recipeRouter);
app.use("/api/v1", userRouter);
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(Port, () => {
  console.log(`Server is connected to Port ${Port}`);
});

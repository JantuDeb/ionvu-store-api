const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
require("./config/database").connect();
//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cors middleware
app.use(cors());

// import all routes
const user = require("./routes/user");
const category = require("./routes/category");
const product = require("./routes/product");

//routes middlewares
app.use("/api/v1", user); // user routes
app.use("/api/v1", category); // category routes
app.use("/api/v1", product); // product routes

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const templateRoutes = require("./routes/templateRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = 3001;
const url = process.env.MONGO_URL;
app.use(cors());
app.use(bodyParser.json());
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});
app.use("/api/user", userRoutes);
app.use("/api/template", templateRoutes);

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
    console.log("Connected to databaase!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });

exports.app = app;

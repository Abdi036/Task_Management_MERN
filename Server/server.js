const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(`server is running on port ${PORT}`);
  })
  .catch((error) => {
    console.log(`Error connecting to DB ${error.message}`);
  });

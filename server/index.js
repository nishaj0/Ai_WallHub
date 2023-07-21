require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/dbConn");

connectDB();

// middleware for json
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
   console.log("connected to DB");
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

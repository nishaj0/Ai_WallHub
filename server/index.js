require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;

connectDB();

// middleware for json
app.use(express.json());

//routers
app.use("/register", require("./routes/register"))

mongoose.connection.once("open", () => {
   console.log("connected to DB");
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

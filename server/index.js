require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;

// enable CORS
app.use(cors());

connectDB();

// middleware for json
app.use(express.json());

//routers
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

mongoose.connection.once("open", () => {
   console.log("connected to DB");
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOption");
const credentials = require("./middlewares/credentials");
const verifyJWT = require("./middlewares/verifyJWT")
const PORT = process.env.PORT || 5000;

connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// enable CORS
app.use(cors(corsOptions));

//* require('crypto').randomBytes(64).toString('hex')

// middleware for json
app.use(express.json());

app.use(cookieParser());

//routers
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT)
// protected end points

mongoose.connection.once("open", () => {
   console.log("connected to DB");
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

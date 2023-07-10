require("dotenv").config;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// middleware for json
app.use(express.json());


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
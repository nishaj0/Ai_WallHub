require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOption');
const credentials = require('./middlewares/credentials');
const verifyJWT = require('./middlewares/verifyJWT');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 5000;

connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// enable CORS
app.use(cors(corsOptions));

app.use(express.json({}));

app.use(cookieParser());

//routers
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/search', require('./routes/search'));
app.use('/image', require('./routes/image'));

app.use(verifyJWT);
// protected end points
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/upload', require('./routes/api/upload'));

app.use(errorHandler)

mongoose.connection.once('open', () => {
   console.log('connected to DB');
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

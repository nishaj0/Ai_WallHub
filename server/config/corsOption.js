const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      console.log({ index: allowedOrigins.indexOf(origin), origin });
      callback(new Error('not allowed cors'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;

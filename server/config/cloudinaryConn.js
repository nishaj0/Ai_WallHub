const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

const cloudinaryConn = () => {
   try {
      cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET,
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports = cloudinaryConn;

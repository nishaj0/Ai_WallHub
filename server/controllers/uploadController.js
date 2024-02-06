const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();
const Post = require('../model/Post');
const User = require('../model/User');
const cloudinaryConn = require('../config/cloudinaryConn');
const returnError = require('../util/returnError');

// ? Connect to Cloudinary
cloudinaryConn();

const uploadImage = async (req, res, next) => {
   const { title, prompt, tags } = req.body;
   const imageBuffer = req?.file?.buffer;

   
   if (!title || !imageBuffer) return next(returnError(400, 'Please provide a title and an image'));

   try {
      // ? upload the image to cloudinary
      const imageStream = cloudinary.uploader.upload_stream(
         { resource_type: 'image', folder: 'wallHub/wallpapers' },
         
         // ? Callback function to handle the result of the upload
         async (error, result) => {
            if (error) {
               return next(returnError(500, 'Image Upload failed, please try again'));
            } else {
               // ? Create a new post in the database
               const newPost = await Post.create({
                  title,
                  cloudinaryAssetId: result.asset_id,
                  cloudinaryPublicId: result.public_id,
                  url: result.secure_url,
                  prompt,
                  hashTags: tags,
                  userRef: req.userId,
                  width: result.width,
                  height: result.height,
               });
               
               // ? Add the postId to the user's posts array
               const foundUser = await User.findById(req.userId);
               foundUser.posts.push(newPost.id);
               await foundUser.save();

               res.status(201).json({ message: 'post created' });
            }
         },
      );
      imageStream.end(imageBuffer);
   } catch (err) {
      console.log(err);
      next(err);
   }
};

module.exports = { uploadImage };

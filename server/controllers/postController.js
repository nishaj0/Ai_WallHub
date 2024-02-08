const { v2: cloudinary } = require('cloudinary');
const Post = require('../model/Post');
const User = require('../model/User');
const cloudinaryConn = require('../config/cloudinaryConn');
const returnError = require('../util/returnError');

const getImagePost = async (req, res, next) => {
   const { id } = req.params;

   try {
      const image = await Post.findById(id);

      if (!image) return next(returnError(404, `no image matches to ID:${id}`));
      res.status(200).json(image);
   } catch (err) {
      console.log(err);
      next(err);
   }
};

const uploadImagePost = async (req, res, next) => {
   const { title, prompt, tags } = req.body;
   const imageBuffer = req?.file?.buffer;

   if (!title || !imageBuffer) return next(returnError(400, 'Please provide a title and an image'));

   // ? Connect to Cloudinary
   cloudinaryConn();
   try {
      // ? upload the image to cloudinary
      const imageStream = cloudinary.uploader.upload_stream(
         { resource_type: 'image', folder: 'wallHub/wallpapers' },

         // ? Callback function to handle the result of the upload
         async (error, result) => {
            if (error) return next(returnError(500, 'Image Upload failed, please try again'));

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
         },
      );
      imageStream.end(imageBuffer);
   } catch (err) {
      console.log(err);
      next(err);
   }
};

const updatePost = async (req, res, next) => {
   const postId = req.params.id;
   const { userId } = req;
   const { title, prompt, hashTags } = req.body;
   if (!title || !prompt || !hashTags) return next(returnError(401, 'title, prompt and hashTags are required'));

   try {
      const post = await Post.findById(postId);
      if (!post) return next(returnError(404, `no post matches to ID:${postId}`));

      if (!userId === post.userRef) return next(returnError(403, 'You are not authorized to delete this post'));

      post.title = title;
      post.prompt = prompt;
      post.hashTags = hashTags;
      await post.save();
      res.status(200).json({ message: 'post updated successfully' });
   } catch (error) {
      next(error);
   }
};

const deletePost = async (req, res, next) => {
   const postId = req.params.id;
   const { userId } = req;

   try {
      const post = await Post.findById(postId);
      if (!post) return next(returnError(404, `no post matches to ID:${postId}`));

      if (!userId === post.userRef) return next(returnError(403, 'You are not authorized to delete this post'));

      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: 'post deleted successfully' });
   } catch (error) {
      next(error);
   }
};

module.exports = { getImagePost, uploadImagePost, updatePost, deletePost };
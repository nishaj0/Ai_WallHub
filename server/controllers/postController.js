const { v2: cloudinary } = require('cloudinary');
const Post = require('../model/Post');
const User = require('../model/User');
const cloudinaryConn = require('../config/cloudinaryConn');
const returnError = require('../util/returnError');
const postFilter = require('../util/postFilter');

const getImagePost = async (req, res, next) => {
   const { id } = req.params;

   try {
      const image = await Post.findById(id);
      const user = await User.findById(image.userRef);

      if (!image) return next(returnError(404, `no image matches to ID:${id}`));
      res.status(200).json({ ...image._doc, username: user.username });
   } catch (err) {
      console.log(err);
      next(err);
   }
};

const getImagePosts = async (req, res, next) => {
   const { FILTERS, getPostsByFilter, paginatePosts } = postFilter;

   const filter = req.query.filter || FILTERS.RECENT;
   const postsPerPage = Math.max(1, parseInt(req.query.size) || 10);
   let currentPage = Math.max(1, parseInt(req.query.page) || 1);

   const postAttributes = {
      id: 1,
      url: 1,
      width: 1,
      height: 1,
      likedBy: 1,
   };

   try {
      // ? If the filter is 'all', return all posts
      if (filter === FILTERS.ALL) {
         const allPosts = await Post.find().select(postAttributes);
         return res.status(200).json({ posts: allPosts });
      }

      if (!Object.values(FILTERS).includes(filter)) return next(returnError(400, 'Invalid filter'));

      if (typeof postsPerPage !== 'number' || typeof currentPage !== 'number')
         return next(returnError(400, 'Invalid page or size'));

      const filteredPosts = await getPostsByFilter(filter, postAttributes);
      const totalPageCount = Math.ceil(filteredPosts.length / postsPerPage);

      // ? If the current page is greater than the total page count, set the current page to the total page count
      if (currentPage > totalPageCount) currentPage = totalPageCount;

      // ? take the posts for the current page
      const paginatedPosts = paginatePosts(filteredPosts, currentPage, postsPerPage);

      res.status(200).json({ currentPage, totalPageCount, posts: paginatedPosts });
   } catch (error) {
      console.log(error);
      next(error);
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

            res.status(201).json({ message: 'post created', postId: newPost.id });
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
      res.status(200).json({ message: 'post updated successfully', postId: post.id });
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

const handlePostLike = async (req, res, next) => {
   const postId = req.params.id;
   const { userId } = req;

   try {
      const post = await Post.findById(postId);

      if (!post) return next(returnError(404, `no post matches to ID:${postId}`));

      if (post.likedBy.includes(userId)) return next(returnError(400, 'You have already liked this post'));

      // ? add userId to post's liked by list
      post.likedBy.push(userId);
      await post.save();

      res.status(200).json({ message: 'post liked successfully' });
   } catch (error) {
      next(error);
   }
};

const handlePostUnlike = async (req, res, next) => {
   const postId = req.params.id;
   const { userId } = req;

   try {
      const post = await Post.findById(postId);

      if (!post) return next(returnError(404, `no post matches to ID:${postId}`));

      if (!post.likedBy.includes(userId)) return next(returnError(400, 'You have not liked this post'));

      // ? remove userId from post's liked by list
      post.likedBy.pull(userId);
      await post.save();

      res.status(200).json({ message: 'post unliked successfully' });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getImagePost,
   getImagePosts,
   uploadImagePost,
   updatePost,
   deletePost,
   handlePostLike,
   handlePostUnlike,
};

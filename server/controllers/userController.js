const User = require('../model/User');
const Post = require('../model/Post');
const returnError = require('../util/returnError');

const getUserProfile = async (req, res, next) => {
   try {
      const foundUser = await User.findById(req.userId);
      if (!foundUser) return next(returnError(404, 'user not found'));

      res.status(200).json({
         fullName: foundUser.fullName,
         username: foundUser.username,
         email: foundUser.email,
         posts: foundUser.posts,
         createdAt: foundUser.createdAt,
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const getUserPosts = async (req, res, next) => {
   try {
      const { userId } = req;

      const posts = await Post.find({ userRef: userId })
         .select({ id: 1, url: 1, width: 1, height: 1 })
         .sort({ date: -1 })
         .exec();

      if (!posts) return res.sendStatus(204); // ? user has no posts

      return res.status(200).json(posts);
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { getUserProfile, getUserPosts };

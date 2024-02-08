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

const updateUser = async (req, res, next) => {
   const { userId } = req;
   const { fullName, username } = req.body;
   const usernameRegex = /^[a-z][a-z0-9_]*$/;

   if (!fullName || !username) return next(returnError(401, 'fullName and username is required'));

   // ? Check regex match
   if (!usernameRegex.test(username)) return next(returnError(400, 'Invalid username format'));

   const duplicateUsername = await User.findOne({ username: username });
   if (duplicateUsername) return next(returnError(409, 'username already exists'));

   try {
      const user = await User.findById(userId);

      user.fullName = fullName;
      user.username = username;
      await user.save();

      res.status(200).json({ message: `user details updated` });
   } catch (error) {
      next(error);
   }
};

const deleteUser = async (req, res, next) => {
   const { userId } = req;
   try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return next(returnError(404, 'user not found'));

      // ? delete all the post that this user made
      await Post.deleteMany({ userRef: userId });

      // ? clear the jwt token from users cookie
      res.clearCookie('jwt', {
         httpOnly: true,
         // sameSite:"None",
         // secure:true
      });

      res.status(200).json({ message: `user deleted successfully` });
   } catch (error) {
      next(error);
   }
};

module.exports = { getUserProfile, getUserPosts, updateUser, deleteUser };

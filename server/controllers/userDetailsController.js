const User = require('../model/User');
const Post = require('../model/Post');

const getUserDetails = async (req, res) => {
  if (!req.email) return res.sendStatus(401);

  const foundUser = await User.findOne({ email: req.email }).exec();
  if (!foundUser) return res.status(204).json({ message: 'user not found' });

  res.status(200).json({
    name: foundUser.name,
    username: foundUser.username,
    email: foundUser.email,
    posts: foundUser.posts,
  });
};

const getUserPosts = async (req, res) => {
  if (!req.email) return res.status(401).json({ message: 'user not logged' });
  try {
    const posts = await Post.find({ userEmail: req.email })
      .select({ _id: 1, publicImgUrl: 1, width: 1, height: 1 })
      .sort({ date: -1 })
      .exec();

    if (!posts) return res.status(204).json({ message: "user didn't uploaded any posts" });

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserDetails, getUserPosts };

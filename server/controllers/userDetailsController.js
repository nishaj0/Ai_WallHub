const User = require("../model/User");

const getUserDetails = async (req, res) => {
   if (!req.email) return res.sendStatus(401);

   const foundUser = await User.findOne({ email: req.email }).exec();
   if (!foundUser) return res.sendStatus(404);

   res.status(200).json({
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email,
      posts: foundUser.posts,
   });
};

module.exports = { getUserDetails };

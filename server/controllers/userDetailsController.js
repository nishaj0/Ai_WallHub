const User = require("../model/User");

const getUserDetails = async (req, res) => {
   if (!req.email) return res.sendStatus(401);

   const foundUser = await User.foundOne({ email: req.email }).exec();
   if (!foundUser) return res.sendStatus(404);

   res.send(200).json({
      name: foundUser.name,
      email: foundUser.email,
      posts: foundUser.posts,
   });
};

module.exports = {getUserDetails}
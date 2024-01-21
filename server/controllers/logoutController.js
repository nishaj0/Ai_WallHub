const User = require('../model/User');

const handleLogout = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies?.jwt) return res.sendStatus(204); // no content

   const refreshToken = cookies.jwt;
   const foundUser = await User.findOne({ refreshToken }).exec();
   if (!foundUser) {
      res.clearCookie('jwt', {
         httpOnly: true,
         // sameSite:"None",
         // secure:true
      });
      return res.sendStatus(204);
   }

   // ? delete refreshToken from DB
   foundUser.refreshToken = '';
   const result = await foundUser.save();

   res.clearCookie('jwt', {
      httpOnly: true,
      // sameSite:"None",
      // secure:true
   });
   return res.sendStatus(204);
};

module.exports = { handleLogout };

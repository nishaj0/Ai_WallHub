const User = require('../model/User');

const handleLogout = async (req, res, next) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.sendStatus(204);
   const refreshToken = cookies.jwt;

   try {
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
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { handleLogout };

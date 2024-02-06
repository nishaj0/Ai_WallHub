const User = require('../model/User');
const jwt = require('jsonwebtoken');
const returnError = require('../util/returnError');

const handleRefreshToken = async (req, res, next) => {
   const cookies = req.cookies;

   if (!cookies.jwt) return next(returnError(401, 'token cookie not found'));
   const refreshToken = cookies.jwt;

   try {
      const foundUser = await User.findOne({ refreshToken }).exec();
      if (!foundUser) return next(returnError(403, 'invalid token'));

      // ? evaluate jwt
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
         if (err || foundUser.id !== decoded.userId) return next(returnError(403, 'invalid token'));

         const accessToken = jwt.sign(
            {
               userInfo: {
                  userId: foundUser.id,
                  username: foundUser.username,
                  role: foundUser.role,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' },
         );
         res.status(200).json({ accessToken, username: foundUser.username });
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { handleRefreshToken };

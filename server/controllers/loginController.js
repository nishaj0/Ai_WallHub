const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const returnError = require('../util/returnError');

const handleLogin = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) return next(returnError(400, "email and password can't be empty"));

   try {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser) return next(returnError(401, 'user not found'));

      // ? evaluate password
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
         // ? create jwt
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

         const refreshToken = jwt.sign({ userId: foundUser.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
         });

         // ? save refresh token in db
         foundUser.refreshToken = refreshToken;
         const result = await foundUser.save();

         res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // sameSite:"None",
            // secure:true,
            maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
         });
         res.status(200).json({ message: 'login success', accessToken, username: foundUser.username });
      } else {
         next(returnError(401, 'user not found'));
      }
   } catch (err) {
      console.log(err);
      next(err);
   }
};

module.exports = { handleLogin };

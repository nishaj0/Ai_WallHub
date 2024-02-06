const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const returnError = require('../util/returnError');

const handleNewUser = async (req, res, next) => {
   const { fullName, username, email, password } = req.body;

   if (!fullName || !username || !email || !password)
      return next(returnError(400, 'fullName, username, email and password are required'));

   const duplicate = await User.findOne({ email: email }).exec();
   if (duplicate) return next(returnError(409, 'email already exists'));

   try {
      // ? encrypt password
      const hashPassword = await bcrypt.hash(password, 10);

      // ? create user
      const createdUser = User.create({
         fullName: fullName,
         username: username,
         email: email,
         password: hashPassword,
      });

      const foundUser = await User.findOne({ email: email }).exec();

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

      res.status(201).json({
         message: `user: ${username} created`,
         accessToken,
         username: foundUser.username,
      });
   } catch (err) {
      console.log(err);
      next(err);
   }
};

module.exports = { handleNewUser };

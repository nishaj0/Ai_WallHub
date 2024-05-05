const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const returnError = require('../util/returnError');

const handleRegister = async (req, res, next) => {
   const { fullName, username, email, password } = req.body;
   const usernameRegex = /^[a-z][a-z0-9_.]{3,15}$/;
   const passwordRegex = /^\S{8,16}$/;

   if (!fullName || !username || !email || !password)
      return next(returnError(400, 'fullName, username, email and password are required'));

   // ? Check regex match
   if (!usernameRegex.test(username)) return next(returnError(400, 'Invalid username format'));
   if (!passwordRegex.test(password)) return next(returnError(400, 'Invalid password format'));

   try {
      const duplicateEmail = await User.findOne({ email: email });
      if (duplicateEmail) return next(returnError(409, 'email already exists'));

      const duplicateUsername = await User.findOne({ username: username });
      if (duplicateUsername) return next(returnError(409, 'username already exists'));

      // ? encrypt password
      const hashPassword = await bcrypt.hash(password, 10);

      // ? create user
      const createdUser = await User.create({
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
         userId: foundUser.id,
      });
   } catch (err) {
      console.log(err);
      next(err);
   }
};

const handleLogin = async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) return next(returnError(400, "email and password can't be empty"));

   try {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser) return next(returnError(401, 'wrong credentials'));

      // ? evaluate password
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) return next(returnError(401, 'wrong credentials'));

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
      res.status(200).json({
         message: 'login success',
         accessToken,
         username: foundUser.username,
         userId: foundUser.id,
      });
   } catch (err) {
      console.log(err);
      next(err);
   }
};

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
         res.status(200).json({ accessToken, username: foundUser.username, userId: foundUser.id });
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

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

module.exports = { handleRegister, handleLogin, handleRefreshToken, handleLogout };

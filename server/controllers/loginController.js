const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
   }

   const foundUser = await User.findOne({ email: email }).exec();
   if (!foundUser) return res.status(401).json({ message: 'user not found' }); //unauthorized'

   try {
      // evaluate password
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
         const roles = foundUser.roles;
         // create jwt
         const accessToken = jwt.sign(
            {
               userInfo: {
                  email: foundUser.email,
                  roles: roles,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' },
         );
         const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
         });
         // save refresh token in db
         foundUser.refreshToken = refreshToken;
         const result = await foundUser.save();

         res.cookie('jwt', refreshToken, {
            // ? from the fcc tutorial
            // withCredentials: true,
            httpOnly: true,
            // sameSite:"None",
            // secure:true,
            maxAge: 24 * 60 * 60 * 1000 * 7,
         });
         res.status(200).json({ success: 'login success', accessToken, username: foundUser.username });
      } else {
         res.status(401).json({ message: 'wrong password' });
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = { handleLogin };

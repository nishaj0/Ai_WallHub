const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
   const { name, username, email, password } = req.body;
   if (!name || !username || !email || !password) {
      return res
         .status(400)
         .json({ message: "name, username, email and password are required" });
   }

   const duplicate = await User.findOne({ email: email }).exec();
   if (duplicate)
      return res.status(409).json({ message: "email already exist" }); //Conflict

   try {
      // encrypt password
      const hashPassword = await bcrypt.hash(password, 10);

      // create user
      const createdUser = User.create({
         name: name,
         username: username,
         email: email,
         password: hashPassword,
      });

      const foundUser = await User.findOne({ email: email }).exec();
      console.log({foundUser});

      // create jwt
      const accessToken = jwt.sign(
         {
            userInfo: {
               email: foundUser.email,
               roles: foundUser.roles,
            },
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "10s" }
      );

      const refreshToken = jwt.sign(
         { email: foundUser.email },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "7d" }
      );

      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log(result);

      res.cookie("jwt", refreshToken, {
         // ? from the fcc tutorial
         // withCredentials: true,
         httpOnly: true,
         // sameSite:"None",
         // secure:true,
         maxAge: 24 * 60 * 60 * 1000 * 7,
      });

      res.status(201).json({
         success: `new user ${username} created`,
         accessToken,
      });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = { handleNewUser };

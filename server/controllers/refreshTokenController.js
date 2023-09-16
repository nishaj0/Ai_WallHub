const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
   const cookies = req.cookies;
   // console.log({ cookies });
   if (!cookies.jwt) return res.sendStatus(401);
   const refreshToken = cookies.jwt;
   // console.log({ refreshToken });

   const foundUser = await User.findOne({ refreshToken }).exec();
   if (!foundUser) return res.sendStatus(403); //Forbidden
   
   // evaluate jwt
   jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
         if (err || foundUser.email !== decoded.email)
            return res.sendStatus(403); //Forbidden
         const accessToken = jwt.sign(
            {
               userInfo: {
                  email: foundUser.email,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
         );
         res.json({ accessToken });
      }
   );
};

module.exports = { handleRefreshToken };

const User = require('../model/User');

const handleLogout = async (req, res) => {
  // * in we are also clearing accessToken
  const cookies = req.cookies;
  if (cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // ? is refreshToken in DB?
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
  const result = foundUser.save();
  console.log({ result });

  res.clearCookie('jwt', {
    httpOnly: true,
    // sameSite:"None",
    // secure:true
  });
  return res.sendStatus(204);
};

module.exports = { handleLogout };

const jwt = require('jsonwebtoken');
const returnError = require('../util/returnError');

const verifyJWT = (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   if (!authHeader?.startsWith('Bearer')) return res.status(401).json({ message: 'cant find access token' });

   const token = authHeader.split(' ')[1];
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return next(returnError(401, 'invalid token'));

      req.userId = decoded.userInfo.userId;
      req.username = decoded.userInfo.username;
      req.role = decoded.userInfo.role;
      next();
   });
};
module.exports = verifyJWT;

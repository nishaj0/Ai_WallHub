const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.send(400).json({ message: "email and password are required" });
   }

   const foundUser = await User.findOne({ email: email }).exec();
   if (!foundUser) return res.sendStatus(401); //unauthorized'

   try {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
         res.status(200).json({ message: "login success" });
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = { handleLogin };

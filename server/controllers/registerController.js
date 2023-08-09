const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) {
      return res
         .status(400)
         .json({ message: "name, email and password are required" });
   }

   const duplicate = await User.findOne({ email: email }).exec();
   if (duplicate) return res.status(409).json({message:"email already exist"}); //Conflict

   try {
      // encrypt password
      const hashPassword = await bcrypt.hash(password, 10);

      // create user
      const result = User.create({
         name: name,
         email: email,
         password: hashPassword,
      });
      res.status(201).json({ success: `new user ${name} created` });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = { handleNewUser };

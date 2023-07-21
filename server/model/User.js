const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: {
      type: String,
      required: true,
   },
   roles: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "moderator"],
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   //this will store the date of the user's account creation
   date: {
      type: Date,
      default: Date.now,
   },
   // this will store the post id of the posts that the user has posted
   posts: {
      type:[string],
   },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
      unique: true,
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
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   refreshToken: String,
   //this will store the date of the user's account creation
   date: {
      type: Date,
      default: Date.now,
   },
   // this will store the post id of the posts that the user has posted
   posts: {
      type: [String],
   },
   likedPosts: {
      type: [String],
   },
}); // ? add { collection: 'collectionName' } as second parameter of Schema
// ? if you want to specify a collection name
// ? (by default mongoose will create a collection based on the model name)
// ? e.g. mongoose.model("User", userSchema, { collection: "users" });

module.exports = mongoose.model("User", userSchema);

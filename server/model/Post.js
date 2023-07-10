const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   cloudinary_id: {
      type: String,
      required: true,
   },
   publicImgUrl: {
      type: string,
      required: true,
   },
   prompt: {
      type: String,
   },
   hashTags: {
      type: Array,
   },
   // this will store the username of the user who posted the post
   username: {
      type: string,
      required: true,
   },
   // this will store the date of the post's creation
   date: {
      type: Date,
      default: Date.now,
   },
});

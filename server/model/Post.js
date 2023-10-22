const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cloudinaryAsset_id: {
    type: String,
    required: true,
  },
  cloudinaryPublic_id: {
    type: String,
    required: true,
  },
  // this will store the public url of the image stored in cloudinary
  publicImgUrl: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
  },
  hashTags: {
    type: [String],
  },
  // this will store the username of the user who posted the post
  userEmail: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  // this will store the date of the post's creation
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);

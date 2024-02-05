const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      cloudinaryAssetId: {
         type: String,
         required: true,
      },
      cloudinaryPublicId: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
      prompt: {
         type: String,
      },
      hashTags: {
         type: [String],
      },
      width: {
         type: Number,
         required: true,
      },
      height: {
         type: Number,
         required: true,
      },
      // this will store the id of the user who uploaded the image
      userRef: {
         type: String,
         required: true,
      },
      likedBy: {
         type: [String],
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model('Post', postSchema);

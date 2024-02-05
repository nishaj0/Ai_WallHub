const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      fullName: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         required: true,
         unique: true,
      },
      role: {
         type: String,
         required: true,
         default: 'user',
         enum: ['user', 'admin', 'moderator'],
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
      refreshToken: {
         type: String,
      },
      posts: {
         type: [String],
      },
      likedPosts: {
         type: [String],
      },
   },
   {
      timestamps: true,
   },
);

module.exports = mongoose.model('User', userSchema);

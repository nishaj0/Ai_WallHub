const express = require('express');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
require('dotenv').config();

const User = require('../model/User');
const Post = require('../model/Post');

// ? config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    const { title, prompt, tags } = req.body;
    const imageBuffer = req.file.buffer;
    console.log({ imageBuffer, title, prompt, tags });

    // ? title and image are required
    if (!title || !imageBuffer) res.status(400).json({ message: 'title and image are required' });

    // ? Create a Readable Stream from the image buffer
    const imageStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'wallHub/wallpapers' },
      (error, result) => {
        // ? this callback function will called when the upload is completed
        // console.log("Upload Stream Callback Called");
        // console.log({ result, error });

        if (error) {
          console.log({ error });

          res.status(500).json({
            success: false,
            message: 'failed to upload image to cloudinary',
            error: error,
          });
        } else {
          // ? Create a new post in the database
          console.log('Upload Successful');
          console.log(result);
          const newPost = Post.create({
            title,
            cloudinaryAsset_id: result.asset_id,
            cloudinaryPublic_id: result.public_id,
            publicImgUrl: result.secure_url,
            prompt,
            hashTags: tags,
            userEmail: req.email,
            width: result.width,
            height: result.height,
          });

          res.status(201).json({ success: true, message: 'post created' });
        }
      },
    );

    imageStream.end(imageBuffer);
    // console.log(imageStream.end());
    // console.log("Upload Stream Started");

    // // ? Upload the image buffer to Cloudinary
    // const cloudinaryImage = await cloudinary.uploader.upload(imageBuffer, {
    //    resource_type: "auto", // Automatically detect the resource type
    // });

    // console.log(cloudinaryImage);

    // // ? create new post in DB
    // const newPost = await Post.create({
    //    title,
    //    publicImgUrl: cloudinaryImage.url,
    //    cloudinaryAsset_id: cloudinaryImage.asset_id,
    //    prompt,
    //    tags,
    //    // ? email is stored in the req object by the verifyJWT middleware
    //    userEmail: req.email,
    // });
    // res.status(201).json({ success: true, message: "post created" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      success: false,
      message: 'Unable to create a post, please try again',
      err,
    });
  }
};

module.exports = { uploadImage };

const Post = require('../model/Post');
const returnError = require('../util/returnError');

const searchByKeyword = async (req, res, next) => {
   const { keyword } = req.query;
   if (!keyword) return next(returnError(400, 'search keyword is required'));

   try {
      const searchImages = await Post.find({
         $or: [
            { title: { $regex: new RegExp(keyword, 'i') } },
            { prompt: { $regex: new RegExp(keyword, 'i') } },
            { hashTags: { $elemMatch: { $regex: new RegExp(keyword, 'i') } } },
         ],
      }).select({
         id: 1,
         title: 1,
         prompt: 1,
         hashTags: 1,
         url: 1,
         likes: 1,
         createdAt: 1,
         width: 1,
         height: 1,
      });

      res.status(200).json(searchImages);
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const get20Images = async (req, res, next) => {
   try {
      const images = await Post.find()
         .select({
            id: 1,
            title: 1,
            prompt: 1,
            hashTags: 1,
            url: 1,
            likes: 1,
            createdAt: 1,
            width: 1,
            height: 1,
         })
         .sort({ createdAt: -1 })
         .limit(20);
      res.status(200).json(images);
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { searchByKeyword, get20Images };

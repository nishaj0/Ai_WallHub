const Post = require('../model/Post');
const returnError = require('../util/returnError');

const getImage = async (req, res, next) => {
   const { id } = req.params;

   try {
      const image = await Post.findById(id);

      if (!image) return next(returnError(404, `no image matches to ID:${id}`));
      res.status(200).json(image);
   } catch (err) {
      console.log(err);
      next(err);
   }
};

module.exports = { getImage };

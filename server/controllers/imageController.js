const Post = require('../model/Post');

const getImage = async (req, res) => {
   const imageId = req?.params?.id;
   if (!imageId) return res.status(400).json({ message: 'imageId required' });

   try {
      const imageDetails = await Post.findOne({ _id: imageId }).exec();

      if (!imageDetails) return res.status(204).json({ message: `no image matches to ID:${imageId}` });
      // console.log(image);
      res.status(200).json({ imageDetails });
   } catch (err) {
      console.error(err);
   }
};

module.exports = { getImage };

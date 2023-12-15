const Post = require('../model/Post');

const handleSearch = async (req, res) => {
  const keyword = req.body.searchKeyword;
  if (!keyword) return res.status(400).json({ message: 'search keyword required' });

  const searchImages = await Post.find({
    $or: [
      { title: { $regex: new RegExp(keyword, 'i') } },
      { prompt: { $regex: new RegExp(keyword, 'i') } },
      { hashTags: { $elemMatch: { $regex: new RegExp(keyword, 'i') } } },
    ],
  })
    .select({
      _id:1,
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
      likes: 1,
      createdAt: 1,
      width: 1,
      height: 1,
    })
    .exec();

  res.status(200).json({ searchImages });
};

module.exports = { handleSearch };

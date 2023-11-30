const Post = require('../model/Post');

const handleSearch = async (req, res) => {
  const keyword = req.body.searchKeyword;
  if (!keyword) return res.status(400).json({ message: 'search keyword required' });

  const posts = await Post.find({
    $or: [
      { title: { $regex: new RegExp(keyword, 'i') } },
      { prompt: { $regex: new RegExp(keyword, 'i') } },
      { hashTags: { $elemMatch: { $regex: new RegExp(keyword, 'i') } } }
    ]
  })
    .select({
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
    })
    .exec();

  res.status(200).json({ finalResult: posts });
};

module.exports = { handleSearch };

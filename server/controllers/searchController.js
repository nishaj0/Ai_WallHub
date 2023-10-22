const Post = require('../model/Post');

const handleSearch = async (req, res) => {
  const keyword = req.body.searchKeyword;

  if (!keyword)
    return req.status(400).json({ message: 'search keyword required' });

  const posts = Post.find({ title: keyword })
    .select({
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
    })
    .exec();

  res.status(200).json(posts);
};

module.exports = { handleSearch };

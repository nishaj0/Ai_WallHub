const Post = require('../model/Post');

const handleSearch = async (req, res) => {
  const keyword = req.body.searchKeyword;
  // console.log(req.body)
  if (!keyword)
    return res.status(400).json({ message: 'search keyword required' });

  const posts = await Post.find({ title: keyword })
    .select({
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
    })
    .exec();
    console.log({posts})
  res.status(200).json(posts);
};

module.exports = { handleSearch };

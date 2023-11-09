const Post = require('../model/Post');

const handleSearch = async (req, res) => {
  const keyword = req.body.searchKeyword;
  // console.log(req.body)
  if (!keyword) return res.status(400).json({ message: 'search keyword required' });

  // ? this will find the titles that contain keyword
  const postsByTitle = await Post.find({
    title: {
      $regex: new RegExp(keyword, 'i'),
    },
  })
    .select({
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
    })
    .exec();

  // ? this will find the prompt that contain keyword
  const postsByPrompt = await Post.find({
    prompt: {
      $regex: new RegExp(keyword, 'i'),
    },
  })
    .select({
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
    })
    .exec();
  // ? this will find the tags that contain keyword
  const postsByTag = await Post.find({
    hashTags: {
      $elemMatch: {
        $regex: new RegExp(keyword, 'i'),
      },
    },
  })
    .select({
      title: 1,
      prompt: 1,
      hashTags: 1,
      publicImgUrl: 1,
    })
    .exec();

  // ? adding everything to one array
  let finalResult = postsByTitle ? postsByTitle : [];

  // ? if postByPrompt are not empty
  if (postsByPrompt.length > 0) {
    for (let i = 0; i < postsByPrompt.length; i++) {
      // ? if postByPrompt[i] is not in finalArray, then push it into finalArray
      if (!finalResult.includes(postsByPrompt[i])) {
        finalResult.push(postsByPrompt[i]);
      }
    }
  }

  // ? if postByTag are not empty
  if (postsByTag.length > 0) {
    for (let i = 0; i < postsByTag.length; i++) {
      // ? if postByTag[i] is not in finalArray, then push it into finalArray
      if (!finalResult.includes(postsByTag[i])) {
        finalResult.push(postsByTag[i]);
      }
    }
  }

  // console.log({ postsByTitle });
  res.status(200).json({ finalResult });
};

module.exports = { handleSearch };

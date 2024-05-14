const Post = require('../model/Post');

const FILTERS = {
   RECENT: 'recent',
   OLD: 'old',
   LIKE: 'like',
   ALL: 'all',
};

const getPostsByFilter = (filter, postAttributes) => {
   // ? Map of different post filters
   const postFilterMap = {
      [FILTERS.RECENT]: Post.find().select(postAttributes).sort({ createdAt: -1 }),
      [FILTERS.OLD]: Post.find().select(postAttributes).sort({ createdAt: 1 }),
      [FILTERS.LIKE]: Post.aggregate([
         { $addFields: { likeCount: { $size: '$likedBy' } } },
         { $sort: { likeCount: -1 } },
         { $project: postAttributes },
      ]),
   };
   return postFilterMap[filter];
};

const paginatePosts = (posts, currentPage, postsPerPage) => {
   const startIndex = currentPage * postsPerPage - postsPerPage;
   const endIndex = currentPage * postsPerPage;
   return posts.slice(startIndex, endIndex);
};

module.exports = { FILTERS, getPostsByFilter, paginatePosts };

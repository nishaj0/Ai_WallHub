const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchController.searchPostsByKeyword);
router.get('/recent', searchController.getRecentPost);

module.exports = router;

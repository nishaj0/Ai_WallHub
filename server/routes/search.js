const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.route('/').post(searchController.searchByKeyword);
router.route('/home').get(searchController.get20Images);

module.exports = router;

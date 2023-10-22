const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/searchController");

router.route("/").get(searchController.handleSearch);

module.exports = router;
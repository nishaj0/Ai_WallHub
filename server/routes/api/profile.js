const express = require('express')
const router = express.Router()
const userDetailsController = require("../../controllers/userDetailsController")

router.route('/').get(userDetailsController.getUserDetails);

module.exports = router
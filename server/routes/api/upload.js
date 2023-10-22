const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage(); // Use memory storage for multer
const upload = multer({ storage: storage }); // Initialize multer with the storage configuration

const uploadController = require('../../controllers/uploadController');

router.route('/').post(upload.single('image'), uploadController.uploadImage);

module.exports = router;

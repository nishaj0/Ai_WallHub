const express = require('express');
const multer = require('multer');
const verifyJWT = require('../middlewares/verifyJWT');
const postController = require('../controllers/postController');

const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:id', postController.getImagePost);
router.post('/upload', verifyJWT, upload.single('image'), postController.uploadImagePost);

module.exports = router;

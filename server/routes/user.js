const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', verifyJWT, userController.getUserProfile);
router.get('/posts', verifyJWT, userController.getUserPosts);
router.route('/').put(verifyJWT, userController.updateUser).delete(verifyJWT, userController.deleteUser);

module.exports = router;

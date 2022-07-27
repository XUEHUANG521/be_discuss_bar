const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

router.post('/add', postController.addPost);
router.get('/',postController.getAllPosts);

module.exports = router;
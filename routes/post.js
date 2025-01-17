const express = require('express');
const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/post');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;

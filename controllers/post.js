const { Post, User } = require('../models');
const Joi = require('joi');

// Get all posts
const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.json({ posts: posts.rows, total: posts.count });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get post by id
const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a post
const createPost = async (req, res) => {
  const { content } = req.body;

  const schema = Joi.object({
    content: Joi.string().min(10).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const post = await Post.create({
      content,
      authorId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.authorId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  try {
    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.authorId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  try {
    await post.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };

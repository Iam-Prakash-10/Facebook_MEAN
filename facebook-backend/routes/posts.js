const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify token
function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const post = new Post({ user: req.user.id, text: req.body.text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 
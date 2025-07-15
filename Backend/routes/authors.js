const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// POST: Add a new author
router.post('/authors', async (req, res) => {
  const { name, bio } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Author name is required.' });
  }
  try {
    const newAuthor = new Author({ name, bio });
    const savedAuthor = await newAuthor.save();
    res.status(201).json({ message: 'Author created successfully!', author: savedAuthor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

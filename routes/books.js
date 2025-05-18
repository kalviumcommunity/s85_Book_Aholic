const express = require('express');
const router = express.Router();
const Book = require('../models/Book');      // Your Book mongoose model
const Author = require('../models/Author');
  // Your Author mongoose model

// POST: Add a new book linked to an existing author
router.post('/books', async (req, res) => {
  const { title, authorId, genre } = req.body;

  if (!title || !authorId) {
    return res.status(400).json({ message: "Title and authorId are required." });
  }

  try {
    // Optional: Verify author exists
    const authorExists = await Author.findById(authorId);
    if (!authorExists) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Create new book with author reference
    const newBook = new Book({
      title,
      genre,
      author: authorId,
    });

    const savedBook = await newBook.save();

    // Populate author field in response
    await savedBook.populate('author').execPopulate();

    res.status(201).json({
      message: "Book added successfully!",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

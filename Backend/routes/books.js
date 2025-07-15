// // routes/books.js

// const express = require("express");
// const router = express.Router();

// // Dummy data
// const books = [
//   { id: 1, title: "Atomic Habits", category: "Self-Improvement" },
//   { id: 2, title: "The Alchemist", category: "Spiritual" },
//   { id: 3, title: "Dune", category: "Sci-Fi" },
//   { id: 4, title: "The Notebook", category: "Romance" },
//   { id: 5, title: "Harry Potter", category: "Fantasy" },
// ];

// // 1. GET All Books
// router.get("/", (req, res) => {
//   res.json(books);
// });

// // 2. GET Book by ID
// router.get("/:id", (req, res) => {
//   const book = books.find(b => b.id == req.params.id);
//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).json({ error: "Book not found" });
//   }
// });

// // 3. GET Books by Category
// router.get("/category/:category", (req, res) => {
//   const category = req.params.category;
//   const filtered = books.filter(b => b.category.toLowerCase() === category.toLowerCase());
//   res.json(filtered);
// });

// // 4. GET Recommended Books (Mocked logic)
// router.get("/recommended/user/:userId", (req, res) => {
//   const { userId } = req.params;
//   res.json({
//     userId,
//     recommended: ["Atomic Habits", "Dune", "Harry Potter"],
//   });
// });

// // 5. GET Pre-Order Books (Mocked static)
// router.get("/pre-orders", (req, res) => {
//   res.json([
//     { id: 6, title: "The Winds of Winter", releaseDate: "2025-12-01" },
//     { id: 7, title: "Project Hail Mary 2", releaseDate: "2025-07-20" },
//   ]);
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/Author');

// POST: Add a new book linked to an existing author
router.post('/books', async (req, res) => {
  const { title, authorId, genre } = req.body;

  if (!title || !authorId) {
    return res.status(400).json({ message: 'Title and authorId are required.' });
  }

  try {
    // Check if author exists
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Create the book linked to author
    const newBook = new Book({
      title,
      genre,
      author: authorId,
    });

    const savedBook = await newBook.save();

    // Populate author details in response
    const populatedBook = await savedBook.populate('author');

    res.status(201).json({
      message: 'Book added successfully!',
      book: populatedBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an existing book
// PUT: Update an existing book
router.put('/books/:id', async (req, res) => {
  const { title, authorId, genre } = req.body;
  const bookId = req.params.id;

  try {
    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // If authorId is provided, validate it
    if (authorId) {
      const authorExists = await Author.findById(authorId);
      if (!authorExists) {
        return res.status(404).json({ message: 'Author not found' });
      }
      book.author = authorId;
    }

    // Update fields if provided
    if (title) book.title = title;
    if (genre) book.genre = genre;

    // Save the updated book
    const updatedBook = await book.save();

    // Populate author
    await updatedBook.populate('author');

    res.status(200).json({
      message: 'Book updated successfully!',
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PUT /api/books/:id
// PUT /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, authorId, genre } = req.body;

    // Optional: Check if author exists
    if (authorId) {
      const authorExists = await Author.findById(authorId);
      if (!authorExists) {
        return res.status(404).json({ message: 'Author not found' });
      }
    }

    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { title, authorId, genre },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const populatedBook = await Book.findById(updated._id).populate('authorId');
    res.json(populatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});


module.exports = router;

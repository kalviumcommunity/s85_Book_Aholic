// routes/books.js

const express = require("express");
const router = express.Router();

// Dummy data
const books = [
  { id: 1, title: "Atomic Habits", category: "Self-Improvement" },
  { id: 2, title: "The Alchemist", category: "Spiritual" },
  { id: 3, title: "Dune", category: "Sci-Fi" },
  { id: 4, title: "The Notebook", category: "Romance" },
  { id: 5, title: "Harry Potter", category: "Fantasy" },
];

// 1. GET All Books
router.get("/", (req, res) => {
  res.json(books);
});

// 2. GET Book by ID
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// 3. GET Books by Category
router.get("/category/:category", (req, res) => {
  const category = req.params.category;
  const filtered = books.filter(b => b.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
});

// 4. GET Recommended Books (Mocked logic)
router.get("/recommended/user/:userId", (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    recommended: ["Atomic Habits", "Dune", "Harry Potter"],
  });
});

// 5. GET Pre-Order Books (Mocked static)
router.get("/pre-orders", (req, res) => {
  res.json([
    { id: 6, title: "The Winds of Winter", releaseDate: "2025-12-01" },
    { id: 7, title: "Project Hail Mary 2", releaseDate: "2025-07-20" },
  ]);
});

module.exports = router;

const express = require('express');
const router = express.Router();

// POST: Add a new book
router.post('/books', (req, res) => {
    const { title, author, genre } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required." });
    }

    // Example logic: Save to DB (Mocked here)
    const newBook = { id: Date.now(), title, author, genre };
    
    // Respond with the new book
    res.status(201).json({
        message: "Book added successfully!",
        book: newBook
    });
});

module.exports = router;

// server.js
const express = require("express");
const app = express();
const { logger, notFound, errorHandler } = require("./middleware");

app.use(express.json());
app.use(logger);

// POST endpoint directly in server.js (temporary/simple example)
app.post("/api/books", (req, res) => {
  const { title, author, genre } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }
  // Mock book creation
  const newBook = { id: Date.now(), title, author, genre };
  res.status(201).json({ message: "Book added successfully!", book: newBook });
});



// If you still want to use routes/books, uncomment below and remove above POST endpoint
// const booksRoutes = require("./routes/books");
// app.use("/api/books", booksRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

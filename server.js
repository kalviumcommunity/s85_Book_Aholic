// server.js

const express = require("express");
const app = express();
const { logger, notFound, errorHandler } = require("./middleware");
const booksRoutes = require("./routes/books");

app.use(express.json());
app.use(logger);

app.use("/api/books", booksRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./data/db');
const { logger, notFound, errorHandler } = require('./middleware/middleware');

dotenv.config();

connectDB(); // your custom connection logic, or replace with direct mongoose.connect()

const app = express();

app.use(express.json());
app.use(logger);

// Routes
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

app.use('/api', booksRoutes);
app.use('/api', authorsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

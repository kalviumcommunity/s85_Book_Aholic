const mongoose = require("mongoose");
const express=require("express")
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

const Book = require("../models/book");
const mongoose = require("mongoose");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching books",
      error: e.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid book ID format",
      });
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "No Book found in database with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching this book",
      error: e.message,
    });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = req.body;
    const newlyCreatedBook = await Book.create(newBook);
    res.status(201).send({
      success: true,
      message: "Book created successfully",
      data: newlyCreatedBook,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Something went wrong while creating book",
      error: e,
    });
  }
};

const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid book ID format",
      });
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "No Book found in database with this id",
      });
    }
    const newUpdatedBook = req.body;
    const newBookToBeCreated = await Book.findByIdAndUpdate(
      bookId,
      newUpdatedBook,
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: "Books updated successfully",
      data: newBookToBeCreated,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating book",
      error: e,
    });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid book ID format",
      });
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "No Book found in database with this id",
      });
    }
    const newBookToBeCreated = await Book.findByIdAndDelete(bookId);
    res.status(200).send({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting book",
      error: e,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBookById,
  deleteBookById,
};

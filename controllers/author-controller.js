const mongoose = require("mongoose");
const Author = require("../models/author");

const addAuthor = async (req, res) => {
  try {
    const newAuthor = req.body;
    const newlyCreatedAuthor = await Author.create(newAuthor);
    res.status(201).send({
      success: true,
      message: "Author created successfully",
      data: newlyCreatedAuthor,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Something went wrong while creating author",
      error: e,
    });
  }
};

module.exports = { addAuthor }
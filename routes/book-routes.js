const express = require('express');
const {getAllBooks, getBookById, addBook, updateBookById, deleteBookById, getBookWithRefAuthor} = require('../controllers/book-controller')

//create router
const router = express.Router();

router.get('/get', getAllBooks)
router.get('/get/:id', getBookById)
router.post('/add', addBook)
router.put('/update/:id', updateBookById)
router.delete('/delete/:id', deleteBookById)
router.get('/get/book-author/:id', getBookWithRefAuthor);

module.exports = router;


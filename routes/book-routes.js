const express = require('express');
const {getAllBooks, getBookById, addBook, updateBookById, deleteBookById} = require('../controllers/book-controller')

//create router
const router = express.Router();

router.get('/get', getAllBooks)
router.get('/get/:id', getBookById)
router.post('/add', addBook)
router.put('/update/:id', updateBookById)
router.delete('/delete/:id', deleteBookById)

module.exports = router;


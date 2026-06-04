
const express = require('express');
const { addAuthor } = require('../controllers/author-controller');
const router = express.Router();

router.post('/add', addAuthor);

module.exports = router;
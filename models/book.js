const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxLength: [100, 'Book title can not be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1000, 'Year cannot be less than 1000'],
        max: [new Date().getFullYear(), 'Year cannot be in future']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    refAuthor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
})

module.exports = mongoose.model('Book', bookSchema);
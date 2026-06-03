const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true
    },
    email : {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true
    },
    password : {
        type: String,
        required: [true, 'passowrd is required']
    },
    role : {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);
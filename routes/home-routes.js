const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

router.get('/welcome', authMiddleware, (req, res) => {
    const {username, email, userId} = req.userInfo;
    res.json({
        message: 'Welcome to Home page',
        userInfo : {
            username: username,
            email: email,
            id: userId
        }
    })
})

module.exports = router;


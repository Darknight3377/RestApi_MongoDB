const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) =>{
    const authHeaderToken = req.headers['authorization']?.split(" ")[1];
    if(!authHeaderToken) {
        return res.status(401).send({
            sucess: false, 
            message: 'Access denied!! no token in request'
        })
    }
    try{
        const decodedTokenInfo = jwt.verify(authHeaderToken, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedTokenInfo;
        next();
    } catch(e) {
        return res.status(500).send({
            sucess: false, 
            message: `Something went wrong ${e}`
        })
    }
}

module.exports = authMiddleware;
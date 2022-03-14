const jwt = require('jsonwebtoken') 
import config from '../config/config';

const tokenSign = async (user) => { 
    return jwt.sign(
        {
            _id: user.correo, 
            role: user.role
        },
        // process.env.JWT_SECRET, 
        config.JWT_SECRET,
        {
            expiresIn: "1h", 
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, config.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => {
    return jwt.decode(token, null)
}



 export  { tokenSign, decodeSign, verifyToken }
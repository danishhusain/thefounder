const jwt = require('jsonwebtoken'); 
const User = require('../models/userModal');
const dotenv = require('dotenv');
dotenv.config();



exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);


        // Fetch user information from database or other source using decoded.userId
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).send('Invalid token');
        }

        req.user = user; // Attach user information to request object
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Invalid token');
    }
};


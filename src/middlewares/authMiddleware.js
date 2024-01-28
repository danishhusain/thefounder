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





// authMiddleware.js

exports.checkRole = (role) => {
    return (req, res, next) => {
      try {
        // Ensure the user is authenticated (assuming you have a middleware for token verification)
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        console.log(req.user)

        // Check if the user has the required role
        if (req.user.roles && req.user.roles.includes(role)) {
          return next();
        } else {
          return res.status(403).json({ message: 'Forbidden: Insufficient role privileges' });
        }
      } catch (error) {
        console.error('Error in checkRole middleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  };
  
  
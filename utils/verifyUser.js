import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
    
//     if (!token) return next(errorHandler(401, 'Unauthorized'));

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return next(errorHandler(403, 'Forbidden'));

//         req.user = user;
//         next(); 
//     });
// };

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.token; // Adjust based on how you're storing the token
//     if (!token) {
//       return res.status(401).json({ message: 'Access Denied. No token provided.' });
//     }
    
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Add user info to request object
//       req.isAuthenticated = true;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Invalid Token.' });
//     }
//   };
  
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("Token from cookie:", token);

    
    try {
        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.isAuthenticated = true;
        next();
    } catch (err) {
        console.log("Invalid token");
        return res.status(401).json({ message: 'Invalid Token.' });
        
    }
};


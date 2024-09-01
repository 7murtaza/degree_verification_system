import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import path from "path";
import cors from 'cors';
import { verifyToken } from "./utils/verifyUser.js";
import { signOut } from "./controllers/auth.controller.js";


const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log('MongoDB connection error:', err));

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Route definitions
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.get('/registration.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});


app.get('/user.html', verifyToken, (req, res) => {
    if (req.cookies['access_token']) {  // Assuming verifyToken sets req.isAuthenticated
        res.sendFile(path.join(__dirname, 'private', 'user.html'));
    } else {
        res.redirect('/registration.html'); // Redirect to registration if not logged in
    }
});

app.post('/signout', (req, res) => {
    res.clearCookie('access_token');  // Clear the 'access_token' cookie
    res.status(200).json({ message: 'Successfully logged out' });
  });

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const { verifyToken } = require("./utils/verifyUser.js");

dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Route definitions
app.use("/api/auth", authRouter);


app.get("/user.html",verifyToken,(req, res) => {
   
    res.sendFile(path.join(__dirname, "private", "user.html"));
});

app.post("/signout", (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Successfully logged out" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

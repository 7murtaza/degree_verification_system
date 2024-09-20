const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.redirect("/registration.html"); // Redirect to login if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie("access_token"); // Clear invalid token
        res.redirect("/registration.html"); // Redirect to login if token is invalid
    }
};

module.exports = { verifyToken };

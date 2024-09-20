const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User Not Found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

const getUserName = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ username: user.username });
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("Sign Out Successfully");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
    signin,
    getUserName,
    signOut,
};

import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

// export const signup = async (req, res, next) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = bcryptjs.hashSync(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });

//     try {
//         const savedUser = await newUser.save();

//         const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.cookie('access_token', token, {
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000,
//             sameSite: 'strict'
//         });

//         res.status(201).json({ message: "User created successfully" });

//     } catch (error) {
//         next(error);
//     }
// };


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: "User create sucessfully" });
    } catch (error) {
        next(error);
    }
};

// export const signin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const validUser = await User.findOne({ email });
//         if (!validUser) return next(errorHandler(404, "User Not Found"));
//         const validPassword = bcryptjs.compareSync(password, validUser.password);
//         if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
//         const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//         const { password: pass, ...rest } = validUser._doc;
//         res
//             .cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
//             .status(200)
//             .json(rest);

//     } catch (error) {
//         next(error)
//     }
// }

export const signin = async (req, res, next) => {
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

        // req.User = User;

        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
};


export const getUserName = async (req, res, next) => {
    try {
        // Assuming req.user.id is set by your auth middleware
        const userId = req.user.id;

        // Fetch the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the username
        res.json({ username: user.username });
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("Sign Out Successfully");
    } catch (error) {
        next(error);
    }

}

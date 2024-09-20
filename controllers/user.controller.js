// const bcryptjs = require("bcryptjs");
// const User = require("../models/user.model.js");
// const { errorHandler } = require("../utils/error.js");

// const test = (req, res) => {
//     res.json({
//         message: "API Route Is working",
//     });
// };

// const updateUser = async (req, res, next) => {
//     if (req.user.id !== req.params.id) return next(errorHandler(401, "You can update only your account"));
    
//     try {
//         if (req.body.password) {
//             req.body.password = bcryptjs.hashSync(req.body.password, 10);
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: {
//                     username: req.body.username,
//                     email: req.body.email,
//                     password: req.body.password,
//                     avatar: req.body.avatar,
//                 },
//             },
//             { new: true }
//         );

//         const { password, ...rest } = updatedUser._doc;

//         res.status(200).json(rest);
//     } catch (error) {
//         next(error);
//     }
// };

// const deleteUser = async (req, res, next) => {
//     if (req.user.id !== req.params.id) return next(errorHandler(401, "You can delete only your account!"));

//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.clearCookie('access_token');
//         res.status(200).json('User deleted successfully');
//     } catch (error) {
//         next(error);
//     }
// };

// const getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) return next(errorHandler(404, 'User Not Found!'));

//         const { password: pass, ...rest } = user._doc;
//         res.status(200).json(rest);
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = {
//     test,
//     updateUser,
//     deleteUser,
//     getUser,
// };

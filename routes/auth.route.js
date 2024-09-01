import express from "express";
import { signup, signin, signOut, getUserName} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signOut)
// router.get('/', clearCookies)
router.get('/getUserName', verifyToken, getUserName)

export default router;

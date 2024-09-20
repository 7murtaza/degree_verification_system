const express = require("express");
const { signup, signin, signOut } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signOut);

module.exports = router;

const express = require("express");
const authController = require("../controllers/auth.controller");
const { signup, login } = authController;
const userAuth = require("../middlewares/verifySignup");

const router = express.Router();

router.post("/signup", userAuth.checkDuplicateUsernameOrEmail, signup);
router.post("/login", login);

module.exports = router;

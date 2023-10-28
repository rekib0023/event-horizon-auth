import express from "express";
import * as authController from "../controllers/auth.controller";
import * as userAuth from "../middlewares/verifySignup";
const { signup, login } = authController;

const router = express.Router();

router.post("/signup", userAuth.checkDuplicateUsernameOrEmail, signup);
router.post("/login", login);

export default router;

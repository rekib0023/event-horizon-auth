import express from "express";
import * as userController from "../controllers/user.controller";
const { getUsers, getUserById, updateUser, deleteUser } = userController;

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

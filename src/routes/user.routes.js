const express = require("express");
const userController = require("../controllers/user.controller");
const { getUsers, getUserById, updateUser, deleteUser } = userController;

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

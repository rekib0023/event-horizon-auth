const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.users;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, email } = req.body;
    const data = {
      firstName,
      lastName,
      userName,
      email,
    };
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      await user.update(data);
      await user.save();
      return res.status(200).send(user);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await user.destroy();
      return res.status(204).send();
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

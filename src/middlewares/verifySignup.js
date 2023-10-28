const db = require("../models");

const User = db.users;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (username) {
      return res.json(409).send("username already taken");
    }

    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.json(409).send("Email already exists");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.users;

const signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      return res.status(201).send(user);
    } else {
      return res.status(400).send("Bad request");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: true,
        });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(200).send(user);
      } else {
        return res.status(401).send("Authenticatioan failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};

import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  LoginRequest,
  UserRequest,
  UserResponse,
} from "../interfaces/user.interfaces";
import db from "../models";

const User = db.users!;

const signup = async (
  req: Request<any, any, UserRequest>,
  res: Response<UserResponse | string>
): Promise<Response<UserResponse | string>> => {
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
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY! as string, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      return res.status(201).send(user.toResponse());
    } else {
      return res.status(400).send("Bad request");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const login = async (
  req: Request<any, any, LoginRequest>,
  res: Response<UserResponse | string>
): Promise<Response<UserResponse | string>> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign(
          { id: user.id },
          process.env.SECRET_KEY! as string,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }
        );

        res.cookie("jwt", token, {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: true,
        });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(200).send(user.toResponse());
      } else {
        return res.status(401).send("Authenticatioan failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { signup, login };

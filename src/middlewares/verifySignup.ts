import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../interfaces/user.interfaces";
import db from "../models";

const User = db.users!;

const checkDuplicateUsernameOrEmail = async (
  req: Request<any, any, UserRequest>,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
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
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { checkDuplicateUsernameOrEmail };

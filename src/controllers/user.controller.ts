import { Request, Response } from "express";
import { UserRequest, UserResponse } from "../interfaces/user.interfaces";
import db from "../models";

const User = db.users!;

const getUsers = async (
  _req: Request,
  res: Response<UserResponse[] | string>
): Promise<Response<UserResponse[] | string>> => {
  try {
    const users = await User.findAll();

    return res.status(200).send(users.map((user) => user.toResponse()));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (
  req: Request,
  res: Response<UserResponse | string>
): Promise<Response<UserResponse | string>> => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return res.status(200).send(user.toResponse());
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (
  req: Request<any, any, UserRequest>,
  res: Response<UserResponse | string>
): Promise<Response<UserResponse | string>> => {
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
      return res.status(200).send(user.toResponse());
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
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
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { getUsers, getUserById, updateUser, deleteUser };

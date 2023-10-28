import { UpdateUserRequest } from "../../proto/auth/UpdateUserRequest";
import { UserId } from "../../proto/auth/UserId";
import { UserResponse } from "../../proto/auth/UserResponse";
import { ErrorResponse, SignupRequest } from "../interfaces";
import db from "../models";

const User = db.users!;

const getUsers = async (): Promise<UserResponse[] | ErrorResponse> => {
  try {
    const users = await User.findAll();

    return users.map((user) => user.toJSON());
  } catch (error) {
    console.error(error);
    return { statusCode: 16, errorMessage: "Internal Server Error" };
  }
};

const getUserById = async (
  userId: UserId
): Promise<UserResponse | ErrorResponse> => {
  try {
    const user = await User.findOne({
      where: {
        id: userId.id,
      },
    });
    if (user) {
      return user.toJSON();
    } else {
      return { statusCode: 5, errorMessage: "User Not found" };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 16, errorMessage: "Internal Server Error" };
  }
};

const updateUser = async (
  req: UpdateUserRequest
): Promise<UserResponse | ErrorResponse> => {
  try {
    const { firstName, lastName, userName, email } = req.user!;
    const data = {
      firstName,
      lastName,
      userName,
      email,
    };
    const user = await User.findOne({
      where: {
        id: req.userId?.id,
      },
    });
    if (user) {
      await user.update(data);
      await user.save();
      return user.toJSON();
    } else {
      return { statusCode: 5, errorMessage: "User Not found" };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 16, errorMessage: "Internal Server Error" };
  }
};

const deleteUser = async (userId: UserId): Promise<void | ErrorResponse> => {
  try {
    const user = await User.findOne({
      where: {
        id: userId.id,
      },
    });

    if (user) {
      await user.destroy();
      return;
    } else {
      return { statusCode: 5, errorMessage: "User Not found" };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 16, errorMessage: "Internal Server Error" };
  }
};

export { getUsers, getUserById, updateUser, deleteUser };

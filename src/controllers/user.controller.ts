import { UpdateUserRequest } from "../../proto/auth/UpdateUserRequest";
import { UserId } from "../../proto/auth/UserId";
import { UserListResponse } from "../../proto/auth/UserListResponse";
import { UserResponse } from "../../proto/auth/UserResponse";
import { ErrorResponse } from "../interfaces";
import db from "../models";
import { DateToTimestamp } from "../utils";

const User = db.users!;

const getUsers = async (): Promise<UserListResponse | ErrorResponse> => {
  try {
    const users = await User.findAll();

    return {
      users: users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        createdAt: DateToTimestamp(user.createdAt),
        updatedAt: DateToTimestamp(user.updatedAt),
      })),
    };
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
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        createdAt: DateToTimestamp(user.createdAt),
        updatedAt: DateToTimestamp(user.updatedAt),
      };
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
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        createdAt: DateToTimestamp(user.createdAt),
        updatedAt: DateToTimestamp(user.updatedAt),
      };
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

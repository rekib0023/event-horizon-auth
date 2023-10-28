import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginRequest } from "../../proto/auth/LoginRequest";
import { UserResponse } from "../../proto/auth/UserResponse";
import { ErrorResponse, SignupRequest } from "../interfaces";
import db from "../models";
import { DateToTimestamp } from "../utils";

const User = db.users!;

const signup = async (
  req: SignupRequest
): Promise<UserResponse | ErrorResponse> => {
  try {
    const { firstName, lastName, userName, email, password } = req;
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
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        createdAt: DateToTimestamp(user.createdAt),
        updatedAt: DateToTimestamp(user.updatedAt),
        token,
      };
    } else {
      return { statusCode: 3, errorMessage: "Bad request" };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 13, errorMessage: "Internal Server Error" };
  }
};

const login = async (
  req: LoginRequest
): Promise<UserResponse | ErrorResponse> => {
  try {
    const { email, password } = req;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password!, user.password);
      if (isSame) {
        let token = jwt.sign(
          { id: user.id },
          process.env.SECRET_KEY! as string,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }
        );

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          createdAt: DateToTimestamp(user.createdAt),
          updatedAt: DateToTimestamp(user.updatedAt),
          token,
        };
      } else {
        return { statusCode: 16, errorMessage: "Authenticatioan failed" };
      }
    } else {
      return { statusCode: 5, errorMessage: "User Not found" };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 16, errorMessage: "Internal Server Error" };
  }
};

export { signup, login };

import * as grpc from "@grpc/grpc-js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { LoginRequest } from "@proto/auth/LoginRequest";
import { Token } from "@proto/auth/Token";
import { TokenVerification } from "@proto/auth/TokenVerification";
import { UserResponse } from "@proto/auth/UserResponse";
import { ErrorResponse, SignupRequest } from "@utils/interfaces";
import db from "@models/index";
import { natsWrapper } from "@utils/nats-config";
import { DateToTimestamp } from "@utils/helpers";

interface MyTokenPayload extends JwtPayload {
  id: string;
}

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
    natsWrapper.publish("user.created", user);

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
      return {
        statusCode: grpc.status.INVALID_ARGUMENT,
        errorMessage: "Bad request",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: grpc.status.INTERNAL,
      errorMessage: "Internal Server Error",
    };
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
        return {
          statusCode: grpc.status.UNAUTHENTICATED,
          errorMessage: "Authenticatioan failed",
        };
      }
    } else {
      return {
        statusCode: grpc.status.NOT_FOUND,
        errorMessage: "User Not found",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: grpc.status.INTERNAL,
      errorMessage: "Internal Server Error",
    };
  }
};

const verifyToken = async (
  req: Token
): Promise<TokenVerification | ErrorResponse> => {
  try {
    const token = req.token;

    if (!token) {
      return {
        statusCode: grpc.status.INVALID_ARGUMENT,
        errorMessage: "Token is required",
      };
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as MyTokenPayload;
    if ("id" in decoded) {
      return { decoded: decoded.id };
    } else {
      return {
        statusCode: grpc.status.INTERNAL,
        errorMessage: "Token does not contain an id property",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: grpc.status.INTERNAL,
      errorMessage: "Internal Server Error",
    };
  }
};

const refreshToken = async (req: Token): Promise<Token | ErrorResponse> => {
  const token = req.token;

  try {
    if (!token) {
      return {
        statusCode: grpc.status.INVALID_ARGUMENT,
        errorMessage: "Token is required",
      };
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as MyTokenPayload;

    let newToken = jwt.sign(
      { id: decoded.id },
      process.env.SECRET_KEY! as string,
      {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      }
    );

    return { token: newToken };
  } catch (error) {
    console.log(error);
    return {
      statusCode: grpc.status.INTERNAL,
      errorMessage: "Internal Server Error",
    };
  }
};

export { signup, login, verifyToken, refreshToken };

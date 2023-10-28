import { SignupRequest, ErrorResponse } from "./interfaces";

import db from "./models";
const User = db.users!;

function isErrorResponse(
  response: any | ErrorResponse
): response is ErrorResponse {
  return (response as ErrorResponse).errorMessage !== undefined;
}

async function checkDuplicateUsernameOrEmail(
  user: SignupRequest
): Promise<void | ErrorResponse> {
  try {
    const username = await User.findOne({
      where: {
        userName: user.userName,
      },
    });

    if (username) {
      return { statusCode: 6, errorMessage: "Username already taken" };
    }

    const email = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (email) {
      return { statusCode: 6, errorMessage: "Email already exists" };
    }

    return;
  } catch (error) {
    console.error(error);
    return { statusCode: 16, errorMessage: "Internal Server Error" };
  }
}

export { isErrorResponse, checkDuplicateUsernameOrEmail };

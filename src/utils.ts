import { SignupRequest, ErrorResponse } from "./interfaces";
import type { Timestamp as _google_protobuf_Timestamp } from '../proto/google/protobuf/Timestamp';

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

function DateToTimestamp(date: Date): _google_protobuf_Timestamp {
  const seconds = Math.floor(date.getTime() / 1000);
  const nanos = (date.getTime() % 1000) * 1e6;
  return {
    seconds: seconds,
    nanos: nanos,
  };
}


export { isErrorResponse, checkDuplicateUsernameOrEmail, DateToTimestamp };

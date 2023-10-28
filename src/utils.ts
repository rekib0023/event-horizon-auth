import * as grpc from "@grpc/grpc-js";
import { SignupRequest, ErrorResponse } from "./interfaces";
import type { Timestamp as _google_protobuf_Timestamp } from "../proto/google/protobuf/Timestamp";

import db from "./models";
const User = db.users!;

function isErrorResponse(
  response: any | ErrorResponse
): response is ErrorResponse {
  if (response!==undefined) {
    return (response as ErrorResponse).errorMessage !== undefined;
  }
  return false;
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
      return {
        statusCode: grpc.status.ALREADY_EXISTS,
        errorMessage: "Username already taken",
      };
    }

    const email = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (email) {
      return {
        statusCode: grpc.status.ALREADY_EXISTS,
        errorMessage: "Email already exists",
      };
    }

    return;
  } catch (error) {
    console.error(error);
    return {
      statusCode: grpc.status.NOT_FOUND,
      errorMessage: "Internal Server Error",
    };
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

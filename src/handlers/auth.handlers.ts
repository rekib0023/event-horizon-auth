import * as grpc from "@grpc/grpc-js";
import { LoginRequest } from "@proto/auth/LoginRequest";
import { Token } from "@proto/auth/Token";
import { TokenVerification } from "@proto/auth/TokenVerification";
import { UserResponse } from "@proto/auth/UserResponse";
import {
  login,
  refreshToken,
  signup,
  verifyToken,
} from "@controllers/auth.controller";
import { ErrorResponse, SignupRequest } from "../utils/interfaces";
import { checkDuplicateUsernameOrEmail, isErrorResponse } from "../utils/helpers";

async function loginHandler(
  call: grpc.ServerUnaryCall<LoginRequest, UserResponse>,
  callback: grpc.sendUnaryData<UserResponse | ErrorResponse>
) {
  const response = await login(call.request);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: response.errorMessage,
    });
  }
  callback(null, response);
}

async function signupHandler(
  call: grpc.ServerUnaryCall<SignupRequest, UserResponse>,
  callback: grpc.sendUnaryData<UserResponse | ErrorResponse>
) {
  const checkDuplicate = await checkDuplicateUsernameOrEmail(call.request);

  if (isErrorResponse(checkDuplicate)) {
    callback({
      code: checkDuplicate.statusCode,
      details: checkDuplicate.errorMessage,
    });
  }

  const response = await signup(call.request);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: response.errorMessage,
    });
  }
  callback(null, response);
}

async function verifyTokenHandler(
  call: grpc.ServerUnaryCall<Token, TokenVerification>,
  callback: grpc.sendUnaryData<TokenVerification | ErrorResponse>
) {
  const response = await verifyToken(call.request);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: response.errorMessage,
    });
  }
  callback(null, response);
}

async function refreshTokenHandler(
  call: grpc.ServerUnaryCall<Token, Token>,
  callback: grpc.sendUnaryData<Token | ErrorResponse>
) {
  const response = await refreshToken(call.request);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: response.errorMessage,
    });
  }
  callback(null, response);
}

export { loginHandler, signupHandler, verifyTokenHandler, refreshTokenHandler };

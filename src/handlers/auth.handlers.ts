import * as grpc from "@grpc/grpc-js";
import { LoginRequest } from "../../proto/auth/LoginRequest";
import { UserResponse } from "../../proto/auth/UserResponse";
import * as authController from "../controllers/auth.controller";
import { ErrorResponse, SignupRequest } from "../interfaces";
import { checkDuplicateUsernameOrEmail, isErrorResponse } from "../utils";

const { signup, login } = authController;

async function loginHandler(
  call: grpc.ServerUnaryCall<LoginRequest, UserResponse>,
  callback: grpc.sendUnaryData<UserResponse | ErrorResponse>
) {
  const response = await login(call.request);
  console.log(response);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: JSON.stringify(response),
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
      details: JSON.stringify(checkDuplicate),
    });
  }

  const response = await signup(call.request);
  console.log(response);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: JSON.stringify(response),
    });
  }
  callback(null, response);
}

export { loginHandler, signupHandler };

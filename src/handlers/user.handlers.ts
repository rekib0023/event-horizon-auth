import * as grpc from "@grpc/grpc-js";
import { UserResponse } from "../../proto/auth/UserResponse";
import * as userController from "../controllers/user.controller";
import { ErrorResponse } from "../interfaces";
import { isErrorResponse } from "../utils";
import { Empty } from "../../proto/auth/Empty";
import { UserId } from "../../proto/auth/UserId";
import { UpdateUserRequest } from "../../proto/auth/UpdateUserRequest";

const { getUsers, getUserById, updateUser, deleteUser } = userController;

async function getUsersHandler(
  call: grpc.ServerUnaryCall<Empty, UserResponse[]>,
  callback: grpc.sendUnaryData<UserResponse[] | ErrorResponse>
) {
  const response = await getUsers();
  console.log(response);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: JSON.stringify(response),
    });
  }
  callback(null, response);
}

async function getUserByIdHandler(
  call: grpc.ServerUnaryCall<UserId, UserResponse>,
  callback: grpc.sendUnaryData<UserResponse | ErrorResponse>
) {
  const response = await getUserById(call.request);
  console.log(response);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: JSON.stringify(response),
    });
  }
  callback(null, response);
}

async function deleteUserHandler(
  call: grpc.ServerUnaryCall<UserId, UserResponse>,
  callback: grpc.sendUnaryData<void | ErrorResponse>
) {
  const response = await deleteUser(call.request);
  console.log(response);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: JSON.stringify(response),
    });
  }
  callback(null, response);
}

async function updateUserHandler(
  call: grpc.ServerUnaryCall<UpdateUserRequest, UserResponse>,
  callback: grpc.sendUnaryData<UserResponse | ErrorResponse>
) {
  const response = await updateUser(call.request);
  console.log(response);
  if (isErrorResponse(response)) {
    callback({
      code: response.statusCode,
      details: JSON.stringify(response),
    });
  }
  callback(null, response);
}

export {
  getUsersHandler,
  getUserByIdHandler,
  deleteUserHandler,
  updateUserHandler,
};

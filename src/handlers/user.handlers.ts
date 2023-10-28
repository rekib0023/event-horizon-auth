import * as grpc from "@grpc/grpc-js";
import { Empty } from "../../proto/auth/Empty";
import { UpdateUserRequest } from "../../proto/auth/UpdateUserRequest";
import { UserId } from "../../proto/auth/UserId";
import { UserListResponse } from "../../proto/auth/UserListResponse";
import { UserResponse } from "../../proto/auth/UserResponse";
import * as userController from "../controllers/user.controller";
import { ErrorResponse } from "../interfaces";
import { isErrorResponse } from "../utils";

const { getUsers, getUserById, updateUser, deleteUser } = userController;

async function getUsersHandler(
  call: grpc.ServerUnaryCall<Empty, UserResponse[]>,
  callback: grpc.sendUnaryData<UserListResponse | ErrorResponse>
) {
  const response = await getUsers();
  console.log(response)
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

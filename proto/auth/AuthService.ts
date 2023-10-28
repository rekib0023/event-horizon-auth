// Original file: proto/auth.proto

import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _auth_Empty, Empty__Output as _auth_Empty__Output } from '../auth/Empty';
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from '../auth/LoginRequest';
import type { SignupRequest as _auth_SignupRequest, SignupRequest__Output as _auth_SignupRequest__Output } from '../auth/SignupRequest';
import type { UpdateUserRequest as _auth_UpdateUserRequest, UpdateUserRequest__Output as _auth_UpdateUserRequest__Output } from '../auth/UpdateUserRequest';
import type { UserId as _auth_UserId, UserId__Output as _auth_UserId__Output } from '../auth/UserId';
import type { UserListResponse as _auth_UserListResponse, UserListResponse__Output as _auth_UserListResponse__Output } from '../auth/UserListResponse';
import type { UserResponse as _auth_UserResponse, UserResponse__Output as _auth_UserResponse__Output } from '../auth/UserResponse';

export interface AuthServiceDefinition {
  DeleteUser: MethodDefinition<_auth_UserId, _auth_UserResponse, _auth_UserId__Output, _auth_UserResponse__Output>
  GetUserById: MethodDefinition<_auth_UserId, _auth_UserResponse, _auth_UserId__Output, _auth_UserResponse__Output>
  GetUsers: MethodDefinition<_auth_Empty, _auth_UserListResponse, _auth_Empty__Output, _auth_UserListResponse__Output>
  Login: MethodDefinition<_auth_LoginRequest, _auth_UserResponse, _auth_LoginRequest__Output, _auth_UserResponse__Output>
  Signup: MethodDefinition<_auth_SignupRequest, _auth_UserResponse, _auth_SignupRequest__Output, _auth_UserResponse__Output>
  UpdateUser: MethodDefinition<_auth_UpdateUserRequest, _auth_UserResponse, _auth_UpdateUserRequest__Output, _auth_UserResponse__Output>
}

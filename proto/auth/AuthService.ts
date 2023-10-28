// Original file: proto/auth.proto

import type { MethodDefinition } from '@grpc/proto-loader'
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from '../auth/LoginRequest';
import type { SignupRequest as _auth_SignupRequest, SignupRequest__Output as _auth_SignupRequest__Output } from '../auth/SignupRequest';
import type { UserResponse as _auth_UserResponse, UserResponse__Output as _auth_UserResponse__Output } from '../auth/UserResponse';

export interface AuthServiceDefinition {
  Login: MethodDefinition<_auth_LoginRequest, _auth_UserResponse, _auth_LoginRequest__Output, _auth_UserResponse__Output>
  Signup: MethodDefinition<_auth_SignupRequest, _auth_UserResponse, _auth_SignupRequest__Output, _auth_UserResponse__Output>
}

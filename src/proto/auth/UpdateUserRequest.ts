// Original file: proto/auth.proto

import type { UserId as _auth_UserId, UserId__Output as _auth_UserId__Output } from './UserId';
import type { SignupRequest as _auth_SignupRequest, SignupRequest__Output as _auth_SignupRequest__Output } from './SignupRequest';

export interface UpdateUserRequest {
  'userId'?: (_auth_UserId | null);
  'user'?: (_auth_SignupRequest | null);
}

export interface UpdateUserRequest__Output {
  'userId'?: (_auth_UserId__Output);
  'user'?: (_auth_SignupRequest__Output);
}

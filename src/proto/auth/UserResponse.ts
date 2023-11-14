// Original file: src/proto/auth.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface UserResponse {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'userName'?: (string);
  'email'?: (string);
  'token'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
}

export interface UserResponse__Output {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'userName'?: (string);
  'email'?: (string);
  'token'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp__Output);
  'updatedAt'?: (_google_protobuf_Timestamp__Output);
}

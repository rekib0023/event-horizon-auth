import { SignupRequest as GeneratedSignupRequest } from "../proto/auth/SignupRequest";

export interface SignupRequest
  extends Omit<
    GeneratedSignupRequest,
    "firstName" | "lastName" | "userName" | "email" | "password"
  > {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  statusCode: number;
  errorMessage: string;
}

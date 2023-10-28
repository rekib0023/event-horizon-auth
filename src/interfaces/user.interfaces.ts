interface UserAttributes {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export { UserAttributes, UserResponse, UserRequest, LoginRequest };

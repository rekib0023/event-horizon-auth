import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import {
  loginHandler,
  refreshTokenHandler,
  signupHandler,
  verifyTokenHandler,
} from "./handlers/auth.handlers";
import {
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from "./handlers/user.handlers";
import { natsWrapper } from "./nats-config";
import db from "./models";

const PROTO_FILE = "../proto/auth.proto";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const authProto = grpc.loadPackageDefinition(packageDefinition);
const authService = (authProto as any).auth.AuthService;

const server = new grpc.Server();

server.addService(authService.service, {
  Login: loginHandler,
  Signup: signupHandler,
  VerifyToken: verifyTokenHandler,
  RefreshToken: refreshTokenHandler,
  GetUsers: getUsersHandler,
  GetUserById: getUserByIdHandler,
  UpdateUser: updateUserHandler,
  DeleteUser: deleteUserHandler,
});

async function startNats() {
  await natsWrapper.connect(process.env.NATS_SERVER!);
}

server.bindAsync(
  `${process.env.HOST}:${process.env.PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    startNats();
    db.sequelize.sync().then(() => {
      console.log("db has been re sync");
    });
    console.log(`Server running at ${process.env.HOST}:${port}`);
    server.start();
  }
);

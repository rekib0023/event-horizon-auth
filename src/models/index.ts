import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { User } from "@models/user.model";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USERNAME!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST!,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  users?: typeof User;
} = {
  sequelize,
  Sequelize,
};

User.initModel(sequelize);

db.users = User;

export default db;

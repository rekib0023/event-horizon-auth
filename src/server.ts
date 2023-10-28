import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import db from "./models";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync().then(() => {
  console.log("db has been re sync");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const sequelize = require("sequelize");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const db = require("./models");

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

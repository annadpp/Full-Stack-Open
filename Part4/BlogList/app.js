const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const authRouter = require("./controllers/auth"); // Add this line
const loginRouter = require("./controllers/login");

const app = express();
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter); // Add this line
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

module.exports = app;

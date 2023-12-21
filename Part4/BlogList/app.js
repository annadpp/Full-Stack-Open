const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const authRouter = require("./controllers/auth");

const app = express();
mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use(middleware.errorHandler);

module.exports = app;

const User = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils/config");

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordOK =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordOK))
    return response.status(401).json({
      error: "invalid username or password",
    });

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    JWT_SECRET,
    { expiresIn: 60 * 60 }
  );

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;

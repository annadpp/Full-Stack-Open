const User = require("../models/user");
const express = require("express");

const { signToken } = require("../utils/auth");

const router = express.Router();

const bcrypt = require("bcrypt");

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordOK =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordOK))
    return response.status(401).json({
      error: "invalid username or password",
    });

  const token = signToken(user);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;

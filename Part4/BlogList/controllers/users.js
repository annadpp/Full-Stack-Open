const User = require("../models/user");
const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");
const { BCRYPT_SALT_ROUNDS } = require("../utils/config");

router.get("/", async (request, response) =>
  response.json(await User.find({}))
);

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3 || !password)
    return response.status(400).json({
      error:
        "Both username and password must be given. Both username and password must be at least 3 characters long.",
    });

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = router;

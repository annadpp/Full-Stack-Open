const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const signToken = (user) =>
  jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    JWT_SECRET,
    { expiresIn: 60 * 60 }
  );

module.exports = {
  signToken,
};

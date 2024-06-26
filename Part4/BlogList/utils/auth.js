const jwt = require("jsonwebtoken");

const { SECRET } = require("../utils/config");

const signToken = (user) =>
  jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    SECRET,
    { expiresIn: 60 * 60 }
  );

module.exports = {
  signToken,
};

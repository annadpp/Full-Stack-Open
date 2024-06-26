require("dotenv").config();

const BCRYPT_SALT_ROUNDS = 10;

const SECRET = process.env.SECRET;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = process.env.PORT || 3003;

module.exports = {
  BCRYPT_SALT_ROUNDS,
  SECRET,
  MONGODB_URI,
  PORT,
};

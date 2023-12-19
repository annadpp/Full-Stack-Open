const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError")
    return response.status(400).send({ error: "malformed id" });
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  else if (error.name === "MongoServerError" && error.code === 11000)
    return response
      .status(400)
      .json({ error: `${Object.keys(error.keyValue)[0]} must be unique.` });

  logger.error(error.message);

  next(error);
};

module.exports = {
  errorHandler,
};

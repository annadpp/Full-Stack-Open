const logger = require("./logger");

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer "))
    request.authToken = authorization.substring(7);

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError")
    return response.status(400).send({ error: "malformed id" });
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  else if (error.name === "MongoServerError" && error.code === 11000)
    return response
      .status(400)
      .json({ error: `${Object.keys(error.keyValue)[0]} must be unique.` });
  else if (error.name === "JsonWebTokenError")
    return response.status(401).json({
      error: "authentification token is missing or not valid",
    });

  logger.error(error.message);

  next(error);
};

module.exports = {
  errorHandler,
  tokenExtractor,
};

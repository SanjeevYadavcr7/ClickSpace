const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config.keys");

const httpstatusCodes = require("../util/status-codes");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error(
      "################### User is not authenticated ###################"
    );
    error.statusCode = httpstatusCodes.UNAUTHORIZED;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error(
      "################### User is not authenticated ###################"
    );
    error.statusCode = httpstatusCodes.UNAUTHORIZED;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

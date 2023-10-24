const UnauthorizedError = require('../errors/unauthorizedError');
const { errorMessages } = require('../const');
const { validateAccessToken } = require('../service/token');
require('dotenv').config();

module.exports = (req, _, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
    }

    const accessToken = authorizationHeader.replace('Bearer ', '');

    if (!accessToken) {
      next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
    }

    req.user = userData;
    next();
  } catch (err) {
    next(err);
  }
};

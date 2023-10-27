const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const { DEV_JWT_ACCESS_SECRET, DEV_JWT_REFRESH_SECRET } = require('../config');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  return { accessToken, refreshToken };
};

const saveToken = async (userId, refreshToken, oldRefreshToken = null) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    if (oldRefreshToken) {
      for (let i = 0; i < tokenData.refreshTokens.length; i += 1) {
        if (tokenData.refreshTokens[i] === oldRefreshToken) {
          tokenData.refreshTokens[i] = refreshToken;

          return tokenData.save();
        }
      }
    }
    for (let i = 0; i < tokenData.refreshTokens.length; i += 1) {
      if (tokenData.refreshTokens[i] === null) {
        tokenData.refreshTokens[i] = refreshToken;

        return tokenData.save();
      }
    }
    for (let i = 0; i < tokenData.refreshTokens.length; i += 1) {
      if (i === tokenData.iteration) {
        tokenData.refreshTokens[i] = refreshToken;
        tokenData.iteration += 1;

        return tokenData.save();
      }

      if (i === tokenData.refreshTokens.length - 1) {
        tokenData.refreshTokens[0] = refreshToken;
        tokenData.iteration = 1;

        return tokenData.save();
      }
    }
  }

  const refreshTokens = [refreshToken, null, null, null, null];

  const token = await Token.create({ user: userId, refreshTokens, iteration: 1 });

  return token;
};

const removeToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });

  for (let i = 0; i < tokenData.refreshTokens.length; i += 1) {
    if (tokenData.refreshTokens[i] === refreshToken) {
      tokenData.refreshTokens[i] = null;
      tokenData.save();

      break;
    }
  }

  return null;
};

const findToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({
    user: userId,
    refreshTokens: { $in: [refreshToken] },
  });

  return tokenData;
};

const validateAccessToken = (token) => {
  try {
    const user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_ACCESS_SECRET);

    return user;
  } catch (err) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_REFRESH_SECRET);

    return user;
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};

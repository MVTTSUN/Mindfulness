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

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ user: userId, refreshToken });

  return token;
};

const removeToken = async (refreshToken) => {
  const token = await Token.deleteOne({ refreshToken });

  return token;
};

const findToken = async (refreshToken) => {
  const token = await Token.findOne({ refreshToken });

  return token;
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

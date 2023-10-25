const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const ProofLink = require('../models/proofLink');
const { sendActivationMail, sendProof } = require('./mail');
const {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} = require('./token');
require('dotenv').config();
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
const UnauthorizedError = require('../errors/unauthorizedError');
const { errorMessages } = require('../const');

const { API_URL } = process.env;

const registration = async (name, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const activationLink = uuidv4();
  const user = await User.create({ name, email, password: hash, activationLink });
  const { ...userWithoutPassword } = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.activationLink;

  await sendActivationMail(email, `${API_URL}/auth/activate/${activationLink}`);
  const tokens = generateTokens(userWithoutPassword);

  return { ...tokens, user: userWithoutPassword };
};

const activateUser = async (activationLink) => {
  const user = await User.findOne({ activationLink });

  if (!user) {
    throw new IncorrectError(errorMessages.INCORRECT_DATA);
  }

  user.isActivated = true;
  await user.save();
};

const createProofLink = async (userId, name, email, password, oldPassword) => {
  const proofLink = uuidv4();
  const user = await User.findById(userId);

  if (password && oldPassword) {
    const isPassEquals = await bcrypt.compare(oldPassword, user.password);

    if (!isPassEquals) {
      throw new IncorrectError(errorMessages.INCORRECT_DATA);
    }

    const hash = await bcrypt.hash(password, 10);

    await ProofLink.create({ user: userId, name, proofLink, password: hash, email });
  } else if (email !== user.email) {
    await ProofLink.create({ user: userId, name, proofLink, email });
  }

  await sendProof(user.email, `${API_URL}/auth/proof/${proofLink}`);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
  }

  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals) {
    throw new IncorrectError(errorMessages.INCORRECT_DATA);
  }

  const { ...userWithoutPassword } = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.activationLink;
  const tokens = generateTokens(userWithoutPassword);
  await saveToken(userWithoutPassword._id, tokens.refreshToken);

  return { ...tokens, user: userWithoutPassword };
};

const logoutUser = async (userId, refreshToken) => {
  const token = await removeToken(userId, refreshToken);

  return token;
};

const refreshUser = async (userId, refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError(errorMessages.UNAUTHORIZED);
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDB = await findToken(userId, refreshToken);

  if (!userData || !tokenFromDB) {
    throw new UnauthorizedError(errorMessages.UNAUTHORIZED);
  }

  const user = await User.findById(userData._id);
  const { ...userWithoutPassword } = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.activationLink;
  const tokens = generateTokens(userWithoutPassword);
  await saveToken(userWithoutPassword._id, tokens.refreshToken, refreshToken);

  return { ...tokens, user: userWithoutPassword };
};

module.exports = {
  registration,
  activateUser,
  loginUser,
  logoutUser,
  refreshUser,
  createProofLink,
};

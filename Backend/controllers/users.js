const mongoose = require('mongoose');
const User = require('../models/user');
const ProofLink = require('../models/proofLink');
const {
  registration,
  activateUser,
  loginUser,
  logoutUser,
  refreshUser,
  createProofLink,
} = require('../service/user');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const { errorMessages } = require('../const');
require('dotenv').config();

const { CLIENT_URL } = process.env;

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const { ...userWithoutPassword } = user.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.activationLink;

    if (userWithoutPassword) {
      res.send(userWithoutPassword);
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }
  } catch (err) {
    next(err);
  }
};

const patchUser = async (req, res, next) => {
  try {
    const { name, email, password, oldPassword } = req.body;
    let user = await User.findById(req.user._id);
    const emailLowerCase = email.toLowerCase();

    if (name && emailLowerCase === user.email && !password && !oldPassword) {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { name },
        { new: true, runValidators: true }
      );
    } else {
      await createProofLink(req.user._id, name, emailLowerCase, password, oldPassword);

      return res.send({ message: 'Подтвердите изменения по ссылке в письме' });
    }

    const { ...userWithoutPassword } = user.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.activationLink;

    if (userWithoutPassword) {
      res.send(userWithoutPassword);
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundDataError(errorMessages.NOT_FOUND_DATA));
    } else {
      next(err);
    }
  }
};

const postUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    const users = await User.find({});

    if (users.length === 2) {
      throw new ConflictError('Превышен лимит аккаунтов');
    }

    await registration(name, emailLowerCase, password);

    return res.send({ message: 'ok' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else if (err.code === 11000) {
      next(new ConflictError(errorMessages.CONFLICT));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }

    if (!user.isActivated) {
      throw new IncorrectError('Активируйте аккаунт');
    }

    const userData = await loginUser(emailLowerCase, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // sameSite: true,
      // secure: true,
    });

    const { ...userDataWithoutRefreshToken } = userData;
    delete userDataWithoutRefreshToken.refreshToken;

    return res.send(userDataWithoutRefreshToken);
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await logoutUser(req.user._id, refreshToken);
    res.clearCookie('refreshToken');

    return res.send({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refreshUser(req.params.id, refreshToken);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // sameSite: true,
      // secure: true,
    });

    const { ...userDataWithoutRefreshToken } = userData;
    delete userDataWithoutRefreshToken.refreshToken;

    return res.send(userDataWithoutRefreshToken);
  } catch (err) {
    next(err);
  }
};

const activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link;

    await activateUser(activationLink);

    res.redirect(`${CLIENT_URL}/login`);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const updateEmailAfterProof = async (req, res, next) => {
  try {
    const proofLink = req.params.link;

    const proofLinkData = await ProofLink.findOne({ proofLink });

    if (!proofLinkData) {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }

    if (proofLinkData.password && !proofLinkData.email) {
      await User.findByIdAndUpdate(
        proofLinkData.user,
        { name: proofLinkData.name, password: proofLinkData.password },
        { new: true, runValidators: true }
      );
    } else if (proofLinkData.email && !proofLinkData.password) {
      await User.findByIdAndUpdate(
        proofLinkData.user,
        { name: proofLinkData.name, email: proofLinkData.email },
        { new: true, runValidators: true }
      );
    } else if (proofLinkData.email && proofLinkData.password) {
      await User.findByIdAndUpdate(
        proofLinkData.user,
        { name: proofLinkData.name, email: proofLinkData.email, password: proofLinkData.password },
        { new: true, runValidators: true }
      );
    }

    res.redirect(`${CLIENT_URL}/profile`);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUser,
  patchUser,
  postUser,
  login,
  logout,
  activate,
  refresh,
  updateEmailAfterProof,
};

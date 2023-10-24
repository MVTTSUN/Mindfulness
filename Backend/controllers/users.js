const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  registration,
  activateUser,
  loginUser,
  logoutUser,
  refreshUser,
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

    if (password && oldPassword) {
      const isPassEquals = await bcrypt.compare(oldPassword, user.password);

      if (!isPassEquals) {
        throw new IncorrectError(errorMessages.INCORRECT_DATA);
      }

      const hash = await bcrypt.hash(password, 10);

      user = await User.findByIdAndUpdate(
        req.user._id,
        { name, email, password: hash },
        { new: true, runValidators: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true, runValidators: true }
      );
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
    const users = await User.find({});

    if (users.length === 2) {
      throw new ConflictError('Превышен лимит аккаунтов');
    }

    await registration(name, email, password);

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
    const user = await User.findOne({ email });

    if (!user.isActivated) {
      throw new IncorrectError('Активируйте аккаунт');
    }

    const userData = await loginUser(email, password);

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
    await logoutUser(refreshToken);

    res.clearCookie('refreshToken');
    return res.send({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refreshUser(refreshToken);

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

module.exports = {
  getUser,
  patchUser,
  postUser,
  login,
  logout,
  activate,
  refresh,
};

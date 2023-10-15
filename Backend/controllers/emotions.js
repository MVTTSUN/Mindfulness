const mongoose = require('mongoose');
const Emotion = require('../models/emotion');
const IncorrectError = require('../errors/incorrectError');
const { errorMessages } = require('../const');
const NotFoundDataError = require('../errors/notFoundDataError');

const getEmotions = async (_, res, next) => {
  try {
    const emotions = await Emotion.find({});

    res.send(emotions);
  } catch (err) {
    next(err);
  }
};

const postEmotions = async (req, res, next) => {
  try {
    const { data } = req.body;
    const emotions = await Emotion.find({});

    data.map(async (value) => {
      await Emotion.create({ value });
    });
    res.send(emotions);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const deleteEmotion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const emotion = await Emotion.findOne({ _id: id });

    if (emotion) {
      await Emotion.findOneAndRemove({ _id: id });
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }
    res.send(emotion);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getEmotions,
  postEmotions,
  deleteEmotion,
};

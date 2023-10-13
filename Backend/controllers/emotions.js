const mongoose = require('mongoose');
const Emotion = require('../models/emotion');
const IncorrectError = require('../errors/incorrectError');
const { errorMessages } = require('../const');
const NotFoundDataError = require('../errors/notFoundDataError');

const getEmotions = async (req, res, next) => {
  try {
    const emotions = await Emotion.find({});
    return res.send(emotions);
  } catch (err) {
    next(err);
  }
};

const postEmotions = async (req, res, next) => {
  const { data } = req.body;

  try {
    data.map(async (value) => {
      await Emotion.create({ value });
    });
    const emotions = await Emotion.find({});
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
    const emotion = await Emotion.findOne({ _id: req.params.id });

    if (emotion) {
      await Emotion.findOneAndRemove({ _id: req.params.id });
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

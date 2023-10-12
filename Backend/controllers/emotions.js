const mongoose = require('mongoose');
const Emotion = require('../models/emotion');
const IncorrectError = require('../errors/incorrectError');
const { errorMessages } = require('../const');

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

  await Emotion.deleteMany();
  try {
    await Emotion.create({ data });
    res.status(200).send({ message: 'success' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getEmotions,
  postEmotions,
};

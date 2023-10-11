const mongoose = require('mongoose');
const Tip = require('../models/tip');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
const { errorMessages } = require('../const');

const getTips = async (req, res, next) => {
  Tip.find({})
    .then((tips) => res.render('tips', { tips }))
    .catch(next);
};

const postTips = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.files);
  console.log(1);
  // Tip.create({ fileName: req.body.fileName })
  //   .then(() => {
  //     res.status(200).send({ message: 'success' });
  //   })
  //   .catch((err) => {
  //     if (err instanceof mongoose.Error.ValidationError) {
  //       next(new IncorrectError(errorMessages.INCORRECT_DATA));
  //     } else {
  //       next(err);
  //     }
  //   });
};

const deleteTips = (req, res, next) => {
  Tip.find({})
    .then((tip) => {
      if (tip) {
        Tip.findAndRemove();
      } else {
        throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
      }
    })
    .then((tip) => {
      res.send(tip);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getTips,
  postTips,
  deleteTips,
};

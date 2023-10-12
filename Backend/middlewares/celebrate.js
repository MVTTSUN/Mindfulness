const { celebrate, Joi } = require('celebrate');
const { LINK_REG_EXP } = require('../const');

const signinCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const postMovieCelebrate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(LINK_REG_EXP),
    trailerLink: Joi.string().required().regex(LINK_REG_EXP),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(LINK_REG_EXP),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieCelebrate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

const patchUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const postTipCelebrate = celebrate({
  body: Joi.object().keys({
    type: Joi.alternatives().try(
      Joi.string().required(),
      Joi.array().items(Joi.string()).required()
    ),
    text: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }),
});

const postEmotionCelebrate = celebrate({
  body: Joi.object().keys({
    data: Joi.array().items(Joi.string()).required(),
  }),
});

module.exports = {
  signinCelebrate,
  signupCelebrate,
  postMovieCelebrate,
  deleteMovieCelebrate,
  patchUserCelebrate,
  postTipCelebrate,
  postEmotionCelebrate,
};

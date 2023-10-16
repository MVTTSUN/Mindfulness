const { celebrate, Joi } = require('celebrate');

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

const deleteEmotionCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

const postInfoCelebrate = celebrate({
  body: Joi.object().keys({
    firstNamePsycho: Joi.string(),
    secondNamePsycho: Joi.string(),
    surnamePsycho: Joi.string(),
    info: Joi.string(),
    nicknameInstagram: Joi.string(),
    nicknameTelegram: Joi.string(),
    nicknameVK: Joi.string(),
    emailPsycho: Joi.string().email(),
    firstNameDevelop: Joi.string(),
    secondNameDevelop: Joi.string(),
    surnameDevelop: Joi.string(),
    emailDevelop: Joi.string().email(),
  }),
});

const postTaskCelebrate = celebrate({
  body: Joi.object().keys({
    title: Joi.string(),
    kind: Joi.string(),
    type: Joi.alternatives().try(
      Joi.string().required(),
      Joi.array().items(Joi.string()).required()
    ),
    text: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }),
});

const deleteTaskCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const patchTaskCelebrate = celebrate({
  body: Joi.object().keys({
    title: Joi.string(),
    kind: Joi.string(),
    type: Joi.alternatives().try(
      Joi.string().required(),
      Joi.array().items(Joi.string()).required()
    ),
    text: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }),
});

const postMeditationCelebrate = celebrate({
  body: Joi.object().keys({
    title: Joi.string(),
    kind: Joi.string(),
    textLines: Joi.array().items({
      text: Joi.string(),
      timeAt: Joi.string(),
      timeTo: Joi.string(),
    }),
  }),
});

const deleteMeditationCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const patchMeditationCelebrate = celebrate({
  body: Joi.object().keys({
    title: Joi.string(),
    kind: Joi.string(),
    textLines: Joi.array().items({
      text: Joi.string(),
      timeAt: Joi.string(),
      timeTo: Joi.string(),
    }),
  }),
});

module.exports = {
  signinCelebrate,
  signupCelebrate,
  patchUserCelebrate,
  postTipCelebrate,
  postEmotionCelebrate,
  deleteEmotionCelebrate,
  postInfoCelebrate,
  postTaskCelebrate,
  deleteTaskCelebrate,
  patchTaskCelebrate,
  postMeditationCelebrate,
  deleteMeditationCelebrate,
  patchMeditationCelebrate,
};

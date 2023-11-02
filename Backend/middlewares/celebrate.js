const { celebrate, Joi } = require('celebrate');
const Emotion = require('../models/emotion');
const { errorMessages } = require('../const');

const uniqueEmotions = async (emotions, { message }) => {
  const dbEmotions = [];
  const promise = emotions.map(async (emotion) => {
    const dbEmotion = await Emotion.findOne({ value: emotion });

    if (dbEmotion) {
      dbEmotions.push(dbEmotion);
    }
  });
  await Promise.all(promise);

  if (dbEmotions.length !== 0) {
    return message({ external: errorMessages.CONFLICT });
  }
};

const loginCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const postUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const activateUserCelebrate = celebrate({
  params: Joi.object().keys({
    link: Joi.string().required(),
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
    data: Joi.array().items(Joi.string()).required().external(uniqueEmotions),
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
    title: Joi.string().required(),
    kind: Joi.string().required(),
    type: Joi.alternatives()
      .try(Joi.string().required(), Joi.array().items(Joi.string()).required())
      .required(),
    text: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }),
});

const deleteTaskCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const patchTaskCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    kind: Joi.string().required(),
    type: Joi.alternatives()
      .try(Joi.string().required(), Joi.array().items(Joi.string()).required())
      .required(),
    text: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }),
});

const postMeditationCelebrate = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    kind: Joi.string().required(),
    textLines: Joi.string(),
  }),
});

const deleteMeditationCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const patchMeditationCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    kind: Joi.string().required(),
    textLines: Joi.string(),
  }),
});

module.exports = {
  loginCelebrate,
  postUserCelebrate,
  activateUserCelebrate,
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

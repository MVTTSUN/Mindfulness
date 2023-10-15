const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  firstNamePsycho: { type: String, required: true },
  secondNamePsycho: { type: String, required: true },
  surnamePsycho: { type: String, required: true },
  info: { type: String, required: true },
  avatarPsycho: { type: String, required: true },
  nicknameInstagram: { type: String, required: true },
  nicknameTelegram: { type: String, required: true },
  nicknameVK: { type: String, required: true },
  emailPsycho: { type: String, required: true },
  firstNameDevelop: { type: String, required: true },
  secondNameDevelop: { type: String, required: true },
  surnameDevelop: { type: String, required: true },
  avatarDevelop: { type: String, required: true },
  emailDevelop: { type: String, required: true },
});

module.exports = mongoose.model('info', infoSchema);

const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  firstNamePsycho: String,
  secondNamePsycho: String,
  surnamePsycho: String,
  info: String,
  avatarPsycho: String,
  nicknameInstagram: String,
  nicknameTelegram: String,
  nicknameVK: String,
  emailPsycho: String,
  firstNameDevelop: String,
  secondNameDevelop: String,
  surnameDevelop: String,
  avatarDevelop: String,
  emailDevelop: String,
});

module.exports = mongoose.model('info', infoSchema);

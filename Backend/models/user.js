const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessages } = require('../const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: errorMessages.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = mongoose.model('user', userSchema);

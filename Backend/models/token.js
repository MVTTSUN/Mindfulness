const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
  refreshToken: { type: String, required: true },
});

module.exports = mongoose.model('token', tokenSchema);

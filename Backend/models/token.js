const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
  refreshTokens: [{ type: String }],
  iteration: { type: Number, required: true },
});

module.exports = mongoose.model('token', tokenSchema);

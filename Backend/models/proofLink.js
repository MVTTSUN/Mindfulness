const mongoose = require('mongoose');

const proofLinkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
  proofLink: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  password: { type: String, default: null },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

module.exports = mongoose.model('proofLink', proofLinkSchema);

const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  type: { type: String, required: true },
  payload: { type: String, required: true },
});

const tipSchema = new mongoose.Schema({
  data: { type: [elementSchema], required: true },
});

module.exports = mongoose.model('tip', tipSchema);

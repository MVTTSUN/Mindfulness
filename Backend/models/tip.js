const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  type: String,
  payload: String,
});

const tipSchema = new mongoose.Schema({
  data: [elementSchema],
});

module.exports = mongoose.model('tip', tipSchema);

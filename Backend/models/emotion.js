const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  value: String,
});

module.exports = mongoose.model('emotion', emotionSchema);

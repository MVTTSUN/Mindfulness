const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  value: { type: String, required: true },
});

module.exports = mongoose.model('emotion', emotionSchema);

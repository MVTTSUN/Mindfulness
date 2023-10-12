const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  data: [String],
});

module.exports = mongoose.model('emotion', emotionSchema);

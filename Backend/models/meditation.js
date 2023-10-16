const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timeAt: { type: String, required: true },
  timeTo: { type: String, required: true },
});

const meditationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  kind: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: true },
  textLines: { type: [elementSchema] },
});

module.exports = mongoose.model('meditation', meditationSchema);

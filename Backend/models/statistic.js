const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema({
  month: Number,
  count: { type: Number, default: 0 },
  android: Number,
  ios: Number,
});

const yearSchema = new mongoose.Schema({
  year: Number,
  months: [monthSchema],
  count: { type: Number, default: 0 },
});

const meditationSchema = new mongoose.Schema({
  title: String,
  count: { type: Number, default: 0 },
  years: [yearSchema],
});

const taskSchema = new mongoose.Schema({
  title: String,
  count: { type: Number, default: 0 },
  years: [yearSchema],
});

const statisticSchema = new mongoose.Schema({
  meditations: [meditationSchema],
  tasks: [taskSchema],
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('statistic', statisticSchema);

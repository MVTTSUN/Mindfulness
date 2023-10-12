const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  type: String,
  payload: String,
});

const taskSchema = new mongoose.Schema({
  data: [elementSchema],
});

module.exports = mongoose.model('task', taskSchema);

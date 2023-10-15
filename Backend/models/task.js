const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  type: { type: String, required: true },
  payload: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: [elementSchema], required: true },
});

module.exports = mongoose.model('task', taskSchema);

const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  content: [
    {
      type: String,
      fileName: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('tip', tipSchema);

const mongoose = require('mongoose');
const { DEV_DATABASE_URL } = require('./config');
require('dotenv').config();

const { DATABASE_URL, NODE_ENV } = process.env;

const startDBConnect = () => {
  mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL);
};

module.exports = {
  startDBConnect,
};

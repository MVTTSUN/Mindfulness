const mongoose = require('mongoose');
const { DEV_DATABASE_URL } = require('./config');
require('dotenv').config();

const { DATABASE_URL, NODE_ENV } = process.env;

const startDBConnect = () => {
  mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL);
  // const connect = mongoose.createConnection(NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  // connect.once('open', () => {
  //   gfsTips = new mongoose.mongo.GridFSBucket(connect.db, {
  //     bucketName: 'uploads/tips',
  //   });
  // });
};

module.exports = {
  startDBConnect,
};

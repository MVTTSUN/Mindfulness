const mongoose = require('mongoose');
const Info = require('../models/info');
const IncorrectError = require('../errors/incorrectError');
const { errorMessages } = require('../const');
const { DEV_DATABASE_URL } = require('../config');
require('dotenv').config();

const { DATABASE_URL, NODE_ENV } = process.env;

let gfs;

const connect = mongoose.createConnection(
  NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'uploads/info',
  });
});

const getInfo = async (req, res, next) => {
  try {
    const files = await gfs.find({}).toArray();
    files.map((file) => gfs.openDownloadStreamByName(file.filename).pipe(res));
    const info = await Info.find({});
    return res.send(info);
  } catch (err) {
    next(err);
  }
};

const getInfoFile = async (req, res, next) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    res.set('Content-Type', file[0].contentType);
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    next(err);
  }
};

const postInfo = async (req, res, next) => {
  const data = {
    ...req.body,
    avatarPsycho: req.files[0].filename,
    avatarDevelop: req.files[1].filename,
  };

  await Info.deleteMany();
  try {
    const info = await Info.create(data);
    res.send(info);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getInfo,
  postInfo,
  getInfoFile,
};

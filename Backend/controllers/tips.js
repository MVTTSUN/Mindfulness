const mongoose = require('mongoose');
const Tip = require('../models/tip');
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
    bucketName: 'uploads/tips',
  });
});

const getTips = async (_, res, next) => {
  try {
    const files = await gfs.find({}).toArray();
    const tips = await Tip.find({});

    files.map(async (file) => {
      await gfs.openDownloadStreamByName(file.filename).pipe(res);
    });
    res.send(tips);
  } catch (err) {
    next(err);
  }
};

const getTipFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const file = await gfs.find({ filename }).toArray();

    res.set('Content-Type', file[0].contentType);
    await gfs.openDownloadStreamByName(filename).pipe(res);
  } catch (err) {
    next(err);
  }
};

const postTips = async (req, res, next) => {
  try {
    const { type, text } = req.body;
    let data = [];
    let cntTexts = 0;
    let cntFiles = 0;
    const types = Array.isArray(type) ? [...type] : [type];
    const texts = Array.isArray(text) ? [...text] : [text];
    const files = [...req.files];

    data = types.map((item) => {
      let result;

      if (item === 'text') {
        result = { type: item, payload: texts[cntTexts] };
        cntTexts += 1;
        return result;
      }
      result = { type: item, payload: files[cntFiles].filename };
      cntFiles += 1;
      return result;
    });

    await Tip.deleteMany();

    const tips = await Tip.create({ data });

    res.send(tips);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getTips,
  postTips,
  getTipFile,
};

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

const getTips = async (req, res, next) => {
  try {
    const files = await gfs.find({}).toArray();
    files.map((file) => gfs.openDownloadStreamByName(file.filename).pipe(res));
    const tips = await Tip.find({});
    return res.send(tips);
  } catch (err) {
    next(err);
  }
};

const getTipFile = async (req, res, next) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    res.set('Content-Type', file[0].contentType);
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    next(err);
  }
};

const postTips = async (req, res, next) => {
  let data = [];
  let cntTexts = 0;
  let cntFiles = 0;
  const types = Array.isArray(req.body.type) ? [...req.body.type] : [req.body.type];
  const texts = Array.isArray(req.body.text) ? [...req.body.text] : [req.body.text];
  const files = [...req.files];

  data = types.map((type) => {
    let result;

    if (type === 'text') {
      result = { type, payload: texts[cntTexts] };
      cntTexts += 1;
      return result;
    }
    result = { type, payload: files[cntFiles].filename };
    cntFiles += 1;
    return result;
  });

  await Tip.deleteMany();
  try {
    await Tip.create({ data });
    res.status(200).send({ message: 'success' });
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

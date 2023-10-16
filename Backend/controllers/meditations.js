const mongoose = require('mongoose');
const Meditation = require('../models/meditation');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
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
    bucketName: 'uploads/meditations',
  });
});

const getMeditations = async (_, res, next) => {
  try {
    const meditations = await Meditation.find({});

    res.send(meditations);
  } catch (err) {
    next(err);
  }
};

const getMeditation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meditation = await Meditation.findOne({ _id: id });

    if (meditation) {
      res.send(meditation);
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const getMeditationFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const file = await gfs.find({ filename }).toArray();

    res.set('Content-Type', file[0].contentType);

    if (file[0] && file[0].contentType.includes('audio')) {
      const fileLength = file[0].length;
      const parts = req.headers.range.replace(/bytes=/, '').split('-');
      const partialStart = parts[0];
      const partialEnd = parts[1];

      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : fileLength - 1;
      const chunkSize = end - start + 1;

      if (req.headers.range) {
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileLength}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': file[0].contentType,
        });
      }

      return new Promise((resolve, reject) => {
        const downloadStream = gfs.openDownloadStreamByName(filename, { start, end });
        downloadStream.on('error', (err) => {
          res.end();
          reject(err);
        });

        downloadStream.on('end', () => {
          res.end();
          resolve(true);
        });

        downloadStream.pipe(res);
      });
    }

    await gfs.openDownloadStreamByName(filename).pipe(res);
  } catch (err) {
    next(err);
  }
};

const postMeditation = async (req, res, next) => {
  try {
    const { title, kind, textLines } = req.body;

    const meditation = await Meditation.create({
      title,
      kind,
      image: req.files[0].filename,
      audio: req.files[1].filename,
      textLines: JSON.parse(textLines),
    });

    res.send(meditation);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const deleteMeditation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meditation = await Meditation.findOne({ _id: id });

    if (meditation) {
      const fileImage = await gfs.find({ filename: meditation.image }).toArray();
      const fileAudio = await gfs.find({ filename: meditation.audio }).toArray();
      await gfs.delete(fileImage[0]._id);
      await gfs.delete(fileAudio[0]._id);

      await Meditation.findOneAndRemove({ _id: id });
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }

    res.send(meditation);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const patchMeditation = async (req, res, next) => {
  try {
    const { title, kind, textLines } = req.body;
    const { id } = req.params;

    const meditation = await Meditation.findOne({ _id: id });

    if (meditation) {
      const fileImage = await gfs.find({ filename: meditation.image }).toArray();
      const fileAudio = await gfs.find({ filename: meditation.audio }).toArray();
      await gfs.delete(fileImage[0]._id);
      await gfs.delete(fileAudio[0]._id);
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }

    const updateMeditation = await Meditation.findByIdAndUpdate(
      req.params.id,
      { title, kind, image: req.files[0].filename, audio: req.files[1].filename, textLines },
      { new: true, runValidators: true }
    );

    res.send(updateMeditation);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundDataError(errorMessages.NOT_FOUND_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  postMeditation,
  getMeditation,
  getMeditations,
  getMeditationFile,
  deleteMeditation,
  patchMeditation,
};

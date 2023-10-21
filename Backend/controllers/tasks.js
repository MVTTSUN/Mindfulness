const mongoose = require('mongoose');
const Task = require('../models/task');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
const ConflictError = require('../errors/conflictError');
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
    bucketName: 'uploads/tasks',
  });
});

const getTasks = async (_, res, next) => {
  try {
    const tasks = await Task.find({});

    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });

    if (task) {
      res.send(task);
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

const getTaskFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const file = await gfs.find({ filename }).toArray();

    res.set('Content-Type', file[0].contentType);
    gfs.openDownloadStreamByName(filename).pipe(res);
  } catch (err) {
    next(err);
  }
};

const postTask = async (req, res, next) => {
  try {
    const { title, kind, type, text } = req.body;
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

    const task = await Task.create({ title, kind, data });

    res.send(task);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const postTaskUnique = async (req, res, next) => {
  try {
    const { title } = req.body;
    const dbTask = await Task.findOne({ title });

    if (dbTask) {
      throw new ConflictError(errorMessages.CONFLICT);
    }

    res.send({ message: 'ok' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });

    if (task) {
      task.data.map(async (item) => {
        if (item.type !== 'text') {
          const file = await gfs.find({ filename: item.payload }).toArray();

          await gfs.delete(file[0]._id);
        }
      });
      await Task.findOneAndRemove({ _id: id });
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }

    res.send(task);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const patchTask = async (req, res, next) => {
  try {
    const { title, kind, type, text } = req.body;
    const { id } = req.params;
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

    const task = await Task.findOne({ _id: id });

    if (task) {
      task.data.map(async (item) => {
        if (item.type !== 'text') {
          const file = await gfs.find({ filename: item.payload }).toArray();

          await gfs.delete(file[0]._id);
        }
      });
    } else {
      throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
    }

    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, kind, data },
      { new: true, runValidators: true }
    );

    res.send(updateTask);
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

const patchTaskUnique = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const taskById = await Task.findOne({ _id: id });
    const taskByTitle = await Task.findOne({ title });

    if (taskById.title !== title && taskByTitle) {
      throw new ConflictError(errorMessages.CONFLICT);
    }

    res.send({ message: 'ok' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new IncorrectError(errorMessages.INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports = {
  postTask,
  postTaskUnique,
  getTask,
  getTasks,
  getTaskFile,
  deleteTask,
  patchTask,
  patchTaskUnique,
};

const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('node:path');
const { DEV_DATABASE_URL } = require('../config');
require('dotenv').config();

const { DATABASE_URL, NODE_ENV } = process.env;

const storageTips = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: (_, file) => {
    return new Promise((resolve) => {
      mongoose.connection.collection('uploads/tips.chunks').deleteMany();
      mongoose.connection.collection('uploads/tips.files').deleteMany();
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads/tips',
      };
      resolve(fileInfo);
    });
  },
});

const storageInfo = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: (_, file) => {
    return new Promise((resolve) => {
      mongoose.connection.collection('uploads/info.chunks').deleteMany();
      mongoose.connection.collection('uploads/info.files').deleteMany();
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads/info',
      };
      resolve(fileInfo);
    });
  },
});

const storageTasks = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: (_, file) =>
    new Promise((resolve) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads/tasks',
      };
      resolve(fileInfo);
    }),
});

const storageMeditations = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: (_, file) =>
    new Promise((resolve) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads/meditations',
      };
      resolve(fileInfo);
    }),
});

const uploadTips = multer({ storage: storageTips });
const uploadInfo = multer({ storage: storageInfo });
const uploadTasks = multer({ storage: storageTasks });
const uploadMeditations = multer({ storage: storageMeditations });

module.exports = {
  uploadTips,
  uploadInfo,
  uploadTasks,
  uploadMeditations,
};

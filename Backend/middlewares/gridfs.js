const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('node:path');
const { DEV_DATABASE_URL } = require('../config');

const { DATABASE_URL, NODE_ENV } = process.env;

const storageTips = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: async (req, file) => {
    await mongoose.connection.collection('uploads/tips.chunks').deleteMany();
    await mongoose.connection.collection('uploads/tips.files').deleteMany();

    return new Promise((resolve) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads/tips',
      };
      resolve(fileInfo);
    });
  },
});

const storageTasks = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: async (req, file) =>
    new Promise((resolve) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'tasks/tips',
      };
      resolve(fileInfo);
    }),
});

const uploadTips = multer({ storage: storageTips });
const uploadTasks = multer({ storage: storageTasks });

module.exports = {
  uploadTips,
  uploadTasks,
};

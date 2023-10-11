const { GridFsStorage } = require('multer-gridfs-storage');
// const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('node:path');
const crypto = require('crypto');
const { DEV_DATABASE_URL } = require('../config');

const { DATABASE_URL, NODE_ENV } = process.env;

const storage = new GridFsStorage({
  url: NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL,
  file: (req, file) =>
    new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    }),
});

const upload = multer({ storage });

module.exports = upload;

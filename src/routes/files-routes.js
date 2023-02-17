const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');

const { auth } = require('../middleware');

const { uploadController } = require('../controller');

const router = new express.Router();

const uploadDir = path.resolve('public/avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = mime.extension(file.mimetype);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage,
});

router
  .use(auth)
  .post('/upload', upload.single('avatar'), uploadController)
  .use('/', express.static('public'));

module.exports = { filesRoute: router };

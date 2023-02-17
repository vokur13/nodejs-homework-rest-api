const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const uploadDir = path.resolve('tmp');
const { v4: uuidv4 } = require('uuid');

const router = new express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
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

const auth = require('../middleware/authMiddleware');

const { avatarUpdateController } = require('../controller');

const { asyncWrapper } = require('../helpers/apiHelper');

router
  .use(auth)
  .patch(
    '/avatars',
    upload.single('avatar'),
    asyncWrapper(avatarUpdateController)
  )
  .use('/avatars', express.static('uploads/avatars'));

module.exports = {
  usersRoutes: router,
};

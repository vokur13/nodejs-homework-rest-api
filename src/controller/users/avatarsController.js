const path = require('path');
const fs = require('fs').promises;
const uploadDir = path.resolve('public/avatars');
const Jimp = require('jimp');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { userAvatarUpdate } = require('../../service');

const avatarUpdateController = async function (req, res) {
  const { description } = req.body;
  const { path, mimetype } = req.file;
  const { _id } = req.user;
  const uniqueSuffix = uuidv4();
  const ext = mime.extension(mimetype);
  const staticFileName = `${_id}-${uniqueSuffix}.${ext}`;

  Jimp.read(path, (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250) // resize
      .write(`${uploadDir}/${staticFileName}`); // save
  });

  await userAvatarUpdate(_id, staticFileName);

  await fs.unlink(path);

  res.json({ description, message: 'File uploaded successfully', status: 200 });
};

module.exports = {
  avatarUpdateController,
};

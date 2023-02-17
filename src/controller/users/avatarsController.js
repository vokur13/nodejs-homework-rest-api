const path = require('path');
const uploadDir = path.resolve('uploads/avatars');
const Jimp = require('jimp');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { putUserAvatar } = require('../../services/usersService');

const avatarUpdateController = async function (req, res) {
  const { description } = req.body;
  const { path, mimetype } = req.file;
  const { _id } = req.user.user;
  const uniqueSuffix = uuidv4();
  const ext = mime.extension(mimetype);
  const staticFileName = `${_id}-${uniqueSuffix}.${ext}`;

  Jimp.read(path, (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250) // resize
      .write(`${uploadDir}/${staticFileName}`); // save
  });

  await putUserAvatar(_id, staticFileName);

  res.json({ description, message: 'Файл успешно загружен', status: 200 });
};

module.exports = {
  avatarUpdateController,
};

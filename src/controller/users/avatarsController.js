const path = require('path');
const fs = require('fs').promises;
const uploadDir = path.resolve('public/avatars');
const Jimp = require('jimp');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');

const { userAvatarUpdate } = require('../../service');

const avatarUpdateController = async function (req, res) {
  const { path, mimetype } = req.file;
  const { _id } = req.user;
  const uniqueSuffix = uuidv4();
  const ext = mime.extension(mimetype);
  const staticFileName = `${_id}-${uniqueSuffix}.${ext}`;

  try {
    Jimp.read(path, (err, avatar) => {
      if (err) throw err;
      avatar
        .resize(250, 250) // resize
        .write(`${uploadDir}/${staticFileName}`); // save
    });

    await userAvatarUpdate(_id, staticFileName);

    res.status(200).json({
      status: 200,
      message: 'File uploaded successfully',
      avatarURL: `${uploadDir}/${staticFileName}`,
      // avatarURL: `/avatars/${staticFileName}`,
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    await fs.unlink(path);
  }
};

module.exports = {
  avatarUpdateController,
};

const { uploadController } = require('./static');
const { avatarUpdateController } = require('./users');
const authConfirmation = require('./authConfirmation');
const authConfirmationRepeat = require('./authConfirmationRepeat');

module.exports = {
  uploadController,
  avatarUpdateController,
  authConfirmation,
  authConfirmationRepeat,
};

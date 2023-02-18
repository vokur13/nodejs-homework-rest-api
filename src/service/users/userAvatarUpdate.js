const { UserModel } = require('../../model');

const userAvatarUpdate = async (user, fileName) => {
  await UserModel.findOneAndUpdate(
    { _id: user },
    {
      $set: {
        avatarURL: `/avatars/${fileName}`,
      },
    }
  );
  return await UserModel.findOne({ _id: user });
};

module.exports = { userAvatarUpdate };

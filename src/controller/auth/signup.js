const { User } = require('../db/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }
  try {
    const newUser = new User({
      email,
      password: await bcrypt.hash(password, saltRounds),
    });
    await newUser.save();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};

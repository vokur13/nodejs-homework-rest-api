const { User } = require('../db/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login',
      data: 'Bad request',
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect password',
      data: 'Bad request',
    });
  }

  const payload = {
    id: user.id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });
};

const logout = async () => {};

module.exports = {
  signup,
  login,
  logout,
};

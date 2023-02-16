const { User } = require('../db/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = {
  login,
};

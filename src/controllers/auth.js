const { signup, login, logout } = require('../models/auth');

const signupController = async (req, res) => {
  const { email, password } = req.body;
  await signup(email, password);
  res.json({ status: 'success' });
};
const loginController = (req, res) => {};
const logoutController = (req, res) => {};

module.exports = {
  signupController,
  loginController,
  logoutController,
};

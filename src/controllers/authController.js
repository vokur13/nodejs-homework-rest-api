// const { signup, login, logout } = require('../model/authModel');

// const signupController = async (req, res, next) => {
//   await signup(req, res, next);
//   res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       message: 'Registration successful',
//     },
//   });
// };

// const loginController = async (req, res) => {
//   const token = await login(req, res);
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       token,
//     },
//   });
// };

// const logoutController = async (req, res) => {};

// module.exports = {
//   signupController,
//   loginController,
//   logoutController,
// };

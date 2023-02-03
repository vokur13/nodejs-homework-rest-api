const { User } = require('../db/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const signup = async (email, password) => {
  const user = new User({
    email,
    password: await bcrypt.hash(
      //   myPlaintextPassword,
      password,
      saltRounds
      //   function (err, hash) {
      //     // Store hash in your password DB.
      //   }
    ),
  });
  await user.save();
};

const login = async ({ req, res }) => {};

const logout = async ({ req, res }) => {};

module.exports = {
  signup,
  login,
  logout,
};

// router.post('/registration', async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     return res.status(409).json({
//       status: 'error',
//       code: 409,
//       message: 'Email is already in use',
//       data: 'Conflict',
//     });
//   }
//   try {
//     const newUser = new User({ username, email });
//     newUser.setPassword(password);
//     await newUser.save();
//     res.status(201).json({
//       status: 'success',
//       code: 201,
//       data: {
//         message: 'Registration successful',
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

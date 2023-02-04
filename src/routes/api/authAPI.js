const express = require('express');
const router = new express.Router();
const { asyncWrapper } = require('../../helpers/apiHelper');
const {
  signupController,
  loginController,
  logoutController,
} = require('../../controllers/authController');

const { authMiddleware } = require('../../middlewares/authMiddleware');

router
  .post('/users/signup', asyncWrapper(signupController))
  .post('/users/login', asyncWrapper(loginController))
  .get('/users/logout', authMiddleware, asyncWrapper(logoutController));
//   .get('/users/current', asyncWrapper(deleteContact))
//   .patch('/users', addItemValidation, asyncWrapper(putContact));

module.exports = router;

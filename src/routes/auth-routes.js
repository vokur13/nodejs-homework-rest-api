const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const { asyncWrapper } = require('../helpers/apiHelper');
// const {
//   signupController,
//   loginController,
//   logoutController,
// } = require('../controllers/authController');

// const { authMiddleware } = require('../middlewares/authMiddleware');

// router
//   .post('/users/signup', asyncWrapper(signupController))
//   .post('/users/login', asyncWrapper(loginController))
//   .get('/users/logout', authMiddleware, asyncWrapper(logoutController));
//   .get('/users/current', asyncWrapper(deleteContact))
//   .patch('/users', addItemValidation, asyncWrapper(putContact));

const TOP_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

router
  .post(
    '/users/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user,
      });
    }
  )
  .post('/users/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(`An error occurred, ${err.message}`);

          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, TOP_SECRET, {
            expiresIn: JWT_EXPIRES,
          });

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

module.exports = { authRoute: router };

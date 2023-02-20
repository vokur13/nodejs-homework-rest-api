/* eslint-disable camelcase */
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { UserModel } = require('../model');
const { asyncWrapper } = require('../helpers');

const auth = require('../middleware/authMiddleware');

const {
  userValidator,
  userSubscriptionValidator,
} = require('../middleware/validationMiddleware');

const { authConfirmation, authConfirmationRepeat } = require('../controller');

const TOP_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

router
  .post(
    '/users/signup',
    passport.authenticate('signup', { session: false }),
    userValidator,
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        // user: req.user,
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

          const { email, subscription } = user;

          return res.status(200).json({ token, user: { email, subscription } });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  })
  .get('/users/current', auth, async (req, res) => {
    const { _id } = req.user;
    const response = await UserModel.findOne({ _id });
    const { email, subscription } = response;
    if (response) {
      res.status(200).json({ response: { email, subscription } });
    }
  })
  .delete('/users/logout', auth, (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send('Unable to log out');
        } else {
          res.send('Logout successful');
        }
      });
    } else {
      res.end();
    }
  })
  .patch('/users', auth, userSubscriptionValidator, async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    if (!subscription) {
      return res.status(400).json({
        code: 400,
        message: 'missing field "subscription"',
      });
    }

    await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: { subscription },
      }
    );

    const response = await UserModel.findOne({ _id });

    if (!response) {
      return res.status(404).json({
        code: 404,
        message: 'Not found',
      });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { response },
    });
  })
  .get('/users/verify/:verificationToken', asyncWrapper(authConfirmation))
  .post('/users/verify', asyncWrapper(authConfirmationRepeat));

module.exports = { authRoute: router };

/* eslint-disable new-cap */
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const SENDER = process.env.SENDGRID_SENDER;

const nodemailer = require('nodemailer');

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.META_USER,
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const TOP_SECRET = process.env.JWT_SECRET;

const { UserModel } = require('../model');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const verificationToken = uuidv4(email + TOP_SECRET);

      // const msg = {
      //   to: email, // Change to your recipient
      //   from: SENDER, // Change to your verified sender
      //   subject: 'Sending with SendGrid is Fun',
      //   text: `Please, confirm your email with request GET /users/verify/${verificationToken}`,
      //   html: `<strong>Please, confirm your email with request GET /users/verify/${verificationToken}</strong>`,
      //   // html: `<strong>Please, <a href="http://localhost:3000/api/auth/users/verify/${verificationToken}">confirm</a> your email</strong>`,
      // };

      const message = {
        from: process.env.META_USER,
        to: email,
        subject: 'New User Signup',
        text: `<strong>Please, confirm your email with request GET /users/verify/${verificationToken}</strong>`,
        html: `<strong>Please, confirm your email with request GET /users/verify/${verificationToken}</strong>`,
      };

      try {
        const user = await UserModel.create({
          email,
          password,
          avatarURL: gravatar.url(
            email,
            { s: '200', r: 'pg', d: 'wavatar' },
            false
          ),
          verificationToken,
        });

        // sgMail
        //   .send(msg)
        //   .then(() => {
        //     console.log('Email sent');
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        await transporter.sendMail(message);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email, verify: true });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: TOP_SECRET,
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

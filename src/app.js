const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// const UserModel = require('./db/userModel');

require('./auth/auth');

const { contactsRoute } = require('./routes/data-routes');
const { authRoute } = require('./routes/auth-routes');
const secureRoute = require('./routes/secure-routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRoute);
app.use('/api/auth', authRoute);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

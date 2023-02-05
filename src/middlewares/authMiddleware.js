const passport = require('passport');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;

// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//   const [tokenType, token] = req.headers.authorization.split(' ');

//   if (!token) {
//     return res.status(401).json({
//       status: 'error',
//       code: 401,
//       message: 'Unauthorized',
//       data: 'Unauthorized',
//     });
//   }
//   try {
//     const user = jwt.decode(token, process.env.JWT_SECRET);
//     req.user = user;
//     req.token = token;
//     next();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = { authMiddleware: auth };

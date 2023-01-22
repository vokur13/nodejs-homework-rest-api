const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

module.exports = {
  addItemValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      phone: myCustomJoi.string().phoneNumber().required(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      return res.status(400).json({
        code: 400,
        message: validateData.error.details,
      });
    }
    next();
  },
};

const { DataModel } = require('../../model');

const addContact = async ({ req, res }, owner) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(404).json({
      code: 404,
      message: 'missing required name field',
    });
  }

  return await DataModel.create({ name, email, phone, owner });
};

module.exports = {
  addData: addContact,
};

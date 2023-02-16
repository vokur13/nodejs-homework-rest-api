const { DataModel } = require('../../model');

const updateContact = async ({ req, res }, owner) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(404).json({
      code: 404,
      message: 'missing fields',
    });
  }

  const response = await DataModel.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { name, email, phone },
    }
  );

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }

  return await DataModel.findOne({ _id: contactId, owner });
};

module.exports = {
  updateData: updateContact,
};

const { DataModel } = require('../../model');

const removeContact = async ({ req, res }, owner) => {
  const { contactId } = req.params;
  const response = await DataModel.findOneAndRemove({ _id: contactId, owner });

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
  return response;
};

module.exports = {
  removeData: removeContact,
};

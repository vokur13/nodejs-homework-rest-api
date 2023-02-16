const { DataModel } = require('../../model');

const getContactById = async ({ req, res }, owner) => {
  const { contactId } = req.params;

  const contact = await DataModel.findOne({ _id: contactId, owner });

  if (!contact) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
  return contact;
};

module.exports = {
  getDataByID: getContactById,
};

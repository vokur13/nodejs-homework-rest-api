const { DataModel } = require('../../model');

const updateStatusContact = async ({ req, res }, owner) => {
  const { contactId } = req.params;

  if (!req.body) {
    return res.status(400).json({
      code: 400,
      message: 'missing field favorite',
    });
  }

  const { favorite } = req.body;

  const response = await DataModel.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { favorite },
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
  updateDataStatus: updateStatusContact,
};

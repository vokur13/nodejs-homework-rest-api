const DataModel = require('../model/dataModel');

const listContacts = async (owner, { skip, limit, favorite }) => {
  const options = {
    page: 1,
    limit: 10,
    collation: {
      locale: 'en',
    },
  };

  DataModel.paginate({}, options, function (err, result) {
    result.limit = 10;
    result.page = 1;
  });

  return await DataModel.find({ owner })
    .select({ _id: 0, owner: 0, __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort('-name');
};

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

// await Post.findOneAndUpdate(
//   { _id: id, owner },
//   {
//     $set: { token: null },
//   }
// );

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
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

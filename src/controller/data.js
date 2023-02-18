const { DataModel } = require('../model');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async ({ req, res }, owner) => {
  const { page = 1, limit = 20 } = req.query;

  const query = DataModel.find({ owner })
    .select({ _id: 0, owner: 0, __v: 0 })
    .sort('-name');

  // const query = DataModel.find({
  //   favorite: req.query.favorite ? req.query.favorite : null,
  //   owner,
  // })
  //   .select({ _id: 0, owner: 0, __v: 0 })
  //   .sort('-name');

  const options = {
    page,
    limit,
    collation: {
      locale: 'en',
    },
  };

  return await DataModel.paginate(query, options, function (err, result) {
    if (!err) {
      return result;
    }
  });
};

const getById = async ({ req, res }, owner) => {
  const { contactId } = req.params;

  const result = await DataModel.findOne({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async ({ req, res }, owner) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    throw HttpError(404, 'Missing required name field');
  }

  const result = await DataModel.create({ name, email, phone, owner });
  res.status(201).json(result);
};

const updateById = async ({ req, res }, owner) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(404).json({
      code: 404,
      message: 'missing fields',
    });
  }

  const result = await DataModel.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { name, email, phone },
    }
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);

  return await DataModel.findOne({ _id: contactId, owner });
};

const deleteById = async ({ req, res }, owner) => {
  const { contactId } = req.params;
  const result = await DataModel.findOneAndRemove({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};

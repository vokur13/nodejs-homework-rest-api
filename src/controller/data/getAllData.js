const { DataModel } = require('../../model');

const listContacts = async ({ req, res }, owner) => {
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

module.exports = {
  getAllData: listContacts,
};

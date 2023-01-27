const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const response = await listContacts();

  res.json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const getContactByID = async (req, res, next) => {
  const response = await getContactById({ req, res });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const postContact = async (req, res, next) => {
  const response = await addContact({ req, res });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { response },
  });
};

const deleteContact = async (req, res, next) => {
  await removeContact({ req, res });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

const putContact = async (req, res, next) => {
  const response = await updateContact(req, res);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const patchContact = async (req, res, next) => {
  const response = await updateStatusContact({ req, res });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
  patchContact,
};

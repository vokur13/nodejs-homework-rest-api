const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../models/contactsModel');

const getContacts = async (req, res) => {
  const { id } = req.user;
  const response = await listContacts(id);

  res.json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const getContactByID = async (req, res) => {
  const { id } = req.user;
  const response = await getContactById({ req, res }, id);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const postContact = async (req, res) => {
  const { id } = req.user;
  const response = await addContact({ req, res }, id);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { response },
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.user;
  await removeContact({ req, res }, id);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

const putContact = async (req, res) => {
  const { id } = req.user;
  const response = await updateContact({ req, res }, id);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const patchContact = async (req, res) => {
  const { id } = req.user;
  const response = await updateStatusContact({ req, res }, id);

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

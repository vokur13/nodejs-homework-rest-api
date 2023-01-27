// const { collection } = require('../db/dataModel');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();

  res.json({ status: 'success', code: 200, data: { contacts } });
};

const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const contact = await addContact({ name, email, phone });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact },
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
  await removeContact(contactId);
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const contact = await updateContact(contactId, { name, email, phone });

  return res.status(200).json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
};

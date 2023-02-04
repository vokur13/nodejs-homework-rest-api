const { Contact } = require('../db/dataModel');

const listContacts = async (owner) => {
  return await Contact.find({ owner });
};

const getContactById = async ({ req, res }, owner) => {
  const { contactId } = req.params;

  const contact = await Contact.findOne({ _id: contactId, owner });

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
  const response = await Contact.findOneAndRemove({ _id: contactId, owner });

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

  return await Contact.create({ name, email, phone, owner });
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

  const response = await Contact.findOneAndUpdate(
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

  return await Contact.findOne({ _id: contactId, owner });
};

const updateStatusContact = async ({ req, res }, owner) => {
  const { contactId } = req.params;

  if (!req.body) {
    return res.status(400).json({
      code: 400,
      message: 'missing field favorite',
    });
  }

  const { favorite } = req.body;

  const response = await Contact.findOneAndUpdate(
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

  return await Contact.findOne({ _id: contactId, owner });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

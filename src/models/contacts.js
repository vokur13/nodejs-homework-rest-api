const { Contact } = require('../db/dataModel');

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async ({ req, res }) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
  return contact;
};

const removeContact = async ({ req, res }) => {
  const { contactId } = req.params;
  const response = await Contact.findByIdAndRemove(contactId);

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
  return response;
};

const addContact = async ({ req, res }) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(404).json({
      code: 404,
      message: 'missing required name field',
    });
  }

  return await Contact.create({ name, email, phone });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(404).json({
      code: 404,
      message: 'missing fields',
    });
  }

  const response = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }

  return await Contact.findById(contactId);
};

const updateStatusContact = async ({ req, res }) => {
  const { contactId } = req.params;

  if (!req.body) {
    return res.status(400).json({
      code: 400,
      message: 'missing field favorite',
    });
  }

  const { favorite } = req.body;

  const response = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }

  return await Contact.findById(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

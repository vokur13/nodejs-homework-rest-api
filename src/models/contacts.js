const { Contact } = require('../db/dataModel');

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const addContact = async ({ name, email, phone }) => {
  return await Contact.create({ name, email, phone });
};

const updateContact = async (contactId, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  return await Contact.findById(contactId);
};

const updateStatusContact = async (contactId, { favorite }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });
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

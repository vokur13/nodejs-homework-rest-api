// const fs = require('fs/promises')
const { Contact } = require('../db/dataModel');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('src/models/contacts.json');

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const filteredList = await data.filter((item) => item.id !== contactId);
    return await fs.writeFile(contactsPath, JSON.stringify(filteredList));
  } catch (error) {
    console.log(error.message);
  }
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

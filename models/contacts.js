// const fs = require('fs/promises')
// const { nanoid } = require('nanoid');
import { nanoid } from 'nanoid';
const fs = require('fs').promises;
const path = require('path');
// const { nanoid } = require('nanoid');

const contactsPath = path.resolve('models/contactsDraft.json');

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    return await data.find((item) => item.id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const filteredList = await data.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredList));
    return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const newContact = { id: nanoid(), name, email, phone };
    // const newContact = { body };
    const newList = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
};

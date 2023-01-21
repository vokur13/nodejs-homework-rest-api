// const fs = require('fs/promises')
const fs = require('fs').promises;
const path = require('path');
const Joi = require('joi');
// import { nanoid } from 'nanoid';
// const { nanoid } = require('nanoid');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  phone: Joi.string().alphanum().min(3).max(30).required(),
});

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
    return await fs.writeFile(contactsPath, JSON.stringify(filteredList));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const newContact = await schema.validateAsync({
      id: '191',
      name,
      email,
      phone,
    });
    const newList = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const contact = await data.find((item) => item.id === contactId);
    contact.name = await schema.validateAsync(name);
    contact.email = await schema.validateAsync(email);
    contact.phone = await schema.validateAsync(phone);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

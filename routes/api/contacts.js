const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' });
  try {
    const { name, email, phone } = req.body;
    const contact = await addContact({ name, email, phone });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);
    res.status(204).json();
  } catch (error) {}
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;

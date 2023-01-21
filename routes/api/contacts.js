const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts.js');

router
  .get('/', async (req, res, next) => {
    try {
      const contacts = await listContacts();
      res.json({ status: 'success', code: 200, data: { contacts } });
    } catch (error) {
      console.log(error.message);
    }
  })
  .get('/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          code: 404,
          message: 'Not found',
        });
      }
      res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } catch (error) {
      console.log(error.message);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ message: 'missing required name field' });
      }

      const contact = await addContact({ name, email, phone });
      res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact },
      });
    } catch (error) {
      console.log(error.message);
    }
  })
  .delete('/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          code: 404,
          message: 'Not found',
        });
      }
      await removeContact(contactId);
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      });
    } catch (error) {
      console.log(error.message);
    }
  })
  .put('/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ message: 'missing fields' });
      }

      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          code: 404,
          message: 'Not found',
        });
      }
      const newContact = await updateContact(contactId, { name, email, phone });
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { newContact },
      });
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;

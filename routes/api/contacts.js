const express = require('express');
const router = new express.Router();
const { addItemValidation } = require('../../middlewares/validation');
const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contacts');

router
  .get('/', getContacts)
  .get('/:contactId', getContactByID)
  .post('/', addItemValidation, postContact)
  .delete('/:contactId', deleteContact)
  .put('/:contactId', addItemValidation, putContact);

module.exports = router;

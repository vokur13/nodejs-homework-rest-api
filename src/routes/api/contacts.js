const express = require('express');
const router = new express.Router();
const { addItemValidation } = require('../../middlewares/validation');
const { asyncWrapper } = require('../../helpers/apiHelper');
const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contacts');

router
  .get('/', asyncWrapper(getContacts))
  .get('/:contactId', asyncWrapper(getContactByID))
  .post('/', addItemValidation, asyncWrapper(postContact))
  .delete('/:contactId', asyncWrapper(deleteContact))
  .put('/:contactId', addItemValidation, asyncWrapper(putContact));

module.exports = router;

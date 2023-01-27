const express = require('express');
const router = new express.Router();
const {
  addItemValidation,
  updateStatusContactValidation,
} = require('../../middlewares/validation');
const { asyncWrapper } = require('../../helpers/apiHelper');
const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} = require('../../controllers/contacts');

router
  .get('/', asyncWrapper(getContacts))
  .get('/:contactId', asyncWrapper(getContactByID))
  .post('/', addItemValidation, asyncWrapper(postContact))
  .delete('/:contactId', asyncWrapper(deleteContact))
  .put('/:contactId', addItemValidation, asyncWrapper(putContact))
  .patch(
    '/:contactId/favorite',
    updateStatusContactValidation,
    asyncWrapper(patchContact)
  );

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  addItemValidation,
  updateStatusContactValidation,
} = require('../middlewares/validation');
// const { asyncWrapper } = require('../helpers/apiHelper');
// const {
//   getContacts,
//   getContactByID,
//   postContact,
//   deleteContact,
//   putContact,
//   patchContact,
// } = require('../controllers/contactsController');
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../model/contactsModel');
// const { authMiddleware } = require('../../middlewares/authMiddleware');
const auth = require('../middlewares/authMiddleware');

// router.use(authMiddleware);
router.use(auth);

// router
//   .get('/', asyncWrapper(getContacts))
//   .get('/:contactId', asyncWrapper(getContactByID))
//   .post('/', addItemValidation, asyncWrapper(postContact))
//   .delete('/:contactId', asyncWrapper(deleteContact))
//   .put('/:contactId', addItemValidation, asyncWrapper(putContact))
//   .patch(
//     '/:contactId/favorite',
//     updateStatusContactValidation,
//     asyncWrapper(patchContact)
//   );

router
  .get('/', async (req, res) => {
    const { _id } = req.user;
    const response = await listContacts(_id);
    res.json({
      status: 'success',
      code: 200,
      data: { response },
    });
  })
  .get('/:contactId', async (req, res) => {
    const { _id } = req.user;
    const response = await getContactById({ req, res }, _id);

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { response },
    });
  })
  .post('/', addItemValidation, async (req, res) => {
    const { _id } = req.user;
    const response = await addContact({ req, res }, _id);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { response },
    });
  })
  .delete('/:contactId', async (req, res) => {
    const { _id } = req.user;
    await removeContact({ req, res }, _id);

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    });
  })
  .put('/:contactId', addItemValidation, async (req, res) => {
    const { _id } = req.user;
    const response = await updateContact({ req, res }, _id);

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { response },
    });
  })
  .patch(
    '/:contactId/favorite',
    updateStatusContactValidation,
    async (req, res) => {
      const { _id } = req.user;
      const response = await updateStatusContact({ req, res }, _id);

      res.status(200).json({
        status: 'success',
        code: 200,
        data: { response },
      });
    }
  );

module.exports = { contactsRoute: router };

const express = require('express');
const router = express.Router();
const {
  addItemValidation,
  updateStatusContactValidation,
} = require('../middleware/validationMiddleware');
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../controller/dataController');

const auth = require('../middleware/authMiddleware');

router.use(auth);

router
  .get('/', async (req, res) => {
    const { _id } = req.user;
    let { skip = 0, limit = 20 } = req.query;
    limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
    skip = parseInt(skip);
    const response = await listContacts(_id, { skip, limit });
    res.json({
      status: 'success',
      code: 200,
      skip,
      limit,
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

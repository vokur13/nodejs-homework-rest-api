const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    console.log(error.message);
  }
};

const getContactByID = async (req, res, next) => {
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
};

const postContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'success',
        code: 400,
        message: 'missing required name field',
      });
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
};

const deleteContact = async (req, res, next) => {
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
};

const putContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'success',
        code: 400,
        message: 'missing fields',
      });
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
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
};

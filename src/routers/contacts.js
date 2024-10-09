// Створіть гілку hw3-crud з гілки hw2-mongodb і виконуйте це завдання в гілці hw3-crud.

// Організуйте роутинг в вашому застосунку:

// винесіть код роутів з файлу src/server.js до файлу src/routers/contacts.js
// винесіть код контролерів з файлу src/server.js до файлу src/controllers/contacts.js

// src/routers/contact.js

import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createNewContact,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactsController,
} from '../controllers/contacts.js';
import createContactsSchema, {
  updateContactsSchema,
} from '../validations/contactValidation.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createNewContact));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactsController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createNewContact),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactsController),
);

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
export default router;

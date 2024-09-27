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
  patchContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    data: contacts,
  });
});

router.get(
  '/contacts/:contactId',
  ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId); // Відповідь, якщо контакт не знайдено
    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      data: contact,
    });
  }),
);

router.post('/contacts', ctrlWrapper(createNewContact));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactsController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
export default router;

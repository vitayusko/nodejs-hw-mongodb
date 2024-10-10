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

// Получение всех контактов с возможной пагинацией и сортировкой
router.get('/contacts', ctrlWrapper(getContactsController));

// Получение одного контакта по ID с валидацией ID
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

// Создание нового контакта с валидацией тела запроса
router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createNewContact),
);

// Обновление контакта по ID с валидацией ID и тела запроса
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactsController),
);

// Удаление контакта по ID с валидацией ID
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;

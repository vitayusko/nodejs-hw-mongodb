// src/routers/contacts.js

import { Router } from 'express';
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
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',

  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(createNewContact),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactsController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;

// src/controllers/contacts.js

import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

export const createNewContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    return next(
      createHttpError(400, 'Name, phoneNumber, and contactType are required'),
    );
  }

  const newContact = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  return res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const updatedFields = {};
  if (name !== undefined) updatedFields.name = name;
  if (phoneNumber !== undefined) updatedFields.phoneNumber = phoneNumber;
  if (email !== undefined) updatedFields.email = email;
  if (isFavourite !== undefined) updatedFields.isFavourite = isFavourite;
  if (contactType !== undefined) updatedFields.contactType = contactType;

  const result = await updateContact(contactId, updatedFields);

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};

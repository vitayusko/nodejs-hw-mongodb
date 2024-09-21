// src/services/students.js

import { contsctsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await contsctsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contsctsCollection.findById(contactId);
  return contact;
};

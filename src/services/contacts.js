// src/services/students.js

import { contactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await contactsCollection.find();
    console.log('Contacts fetched from DB:', contacts);
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};

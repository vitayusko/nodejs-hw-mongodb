// src/services/contacts.js

import { contactsCollection } from '../db/models/contacts.js';

// Получить все контакты
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

// Получить контакт
export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};

// Создать новый контакт
export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

// Обновить данные контакта
export const updateContact = async (id, updatedFields) => {
  const contact = await contactsCollection.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true },
  );

  return contact;
};

// Удалить контакт
export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

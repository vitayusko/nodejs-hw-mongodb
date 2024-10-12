// src/services/contacts.js

import { contactsCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constants/index.js';

// Функция для вычисления данных пагинации
const calculatePaginationData = (totalItems, itemsPerPage, currentPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  return {
    totalItems,
    itemsPerPage,
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
// Получить все контакты
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find();
  const contactsCount = await contactsCollection.countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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

// src/services/contacts.js

import { contactsCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constants/index.js';

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

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find({ userId });
  const contactsCount = await contactsCollection.countDocuments({ userId });

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

export const getContactById = async (contactId, userId) => {
  const contact = await contactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, userId, updatedFields) => {
  const contact = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: updatedFields },
    { new: true },
  );

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

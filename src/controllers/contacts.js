// src/controllers/contacts.js

import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/evn.js';

// Контроллер получения всех контактов
export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  try {
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Контроллер получения контакта по ID
export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved the contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Контроллер создания нового контакта
// export const createNewContact = async (req, res, next) => {
//   try {
//     const { name, phoneNumber, email, isFavourite, contactType } = req.body;

//     if (!name || !phoneNumber || !contactType) {
//       throw createHttpError(
//         400,
//         'Name, phoneNumber, and contactType are required',
//       );
//     }

//     let photoUrl;

//     if (req.file) {
//       if (env('ENABLE_CLOUDINARY') === 'true') {
//         photoUrl = await saveFileToCloudinary(req.file);
//       } else {
//       }
//     }

//     const newContact = await createContact({
//       name,
//       phoneNumber,
//       email,
//       isFavourite,
//       contactType,
//       userId: req.user._id,
//       photoUrl,
//     });

//     return res.status(201).json({
//       status: 201,
//       message: 'Successfully created a contact!',
//       data: newContact,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
export const createNewContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(
        400,
        'Name, phoneNumber, and contactType are required',
      );
    }

    let photoUrl = null; // Инициализация с null

    if (req.file) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(req.file);
        console.log('Cloudinary URL:', photoUrl);
      } else {
        photoUrl = await saveFileToUploadDir(req.file);
        console.log('Local File URL:', photoUrl);
      }
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId: req.user._id,
      photoUrl,
    });

    return res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

// Контроллер обновления контакта
// export const patchContactsController = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const { name, phoneNumber, email, isFavourite, contactType } = req.body;
//     const photo = req.file;

//     let photoUrl;

//     if (photo) {
//       if (env('ENABLE_CLOUDINARY') === 'true') {
//         photoUrl = await saveFileToCloudinary(photo);
//       } else {
//         photoUrl = await saveFileToUploadDir(photo);
//       }
//     }
//     const updatedFields = {};
//     if (name !== undefined) updatedFields.name = name;
//     if (phoneNumber !== undefined) updatedFields.phoneNumber = phoneNumber;
//     if (email !== undefined) updatedFields.email = email;
//     if (isFavourite !== undefined) updatedFields.isFavourite = isFavourite;
//     if (contactType !== undefined) updatedFields.contactType = contactType;
//     if (photoUrl) updatedFields.photoUrl = photoUrl; // Сохраняем URL файла (или путь)

//     const result = await updateContact(contactId, req.user._id, updatedFields, photo: photoUrl,);

//     if (!result) {
//       throw createHttpError(404, 'Contact not found');
//     }

//     res.status(200).json({
//       status: 200,
//       message: 'Successfully patched a contact!',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
export const patchContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const photo = req.file;

    let photoUrl = null; // Инициализация с null

    if (photo) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo); // Загрузка в локальную директорию
      }
    }

    // Создаём объект только с переданными полями
    const updatedFields = {};
    if (name !== undefined) updatedFields.name = name;
    if (phoneNumber !== undefined) updatedFields.phoneNumber = phoneNumber;
    if (email !== undefined) updatedFields.email = email;
    if (isFavourite !== undefined) updatedFields.isFavourite = isFavourite;
    if (contactType !== undefined) updatedFields.contactType = contactType;
    if (photoUrl) updatedFields.photoUrl = photoUrl; // Сохраняем URL файла (или путь)

    const result = await updateContact(contactId, req.user._id, updatedFields); // Передача только одного объекта с обновлениями

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Контроллер удаления контакта
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// export const createContactController = async (req, res) => {
//   const { name, phoneNumber, email, isFavourite, contactType } = req.body;

//   const newContact = await createContact({
//     name,
//     phoneNumber,
//     email,
//     isFavourite,
//     contactType,
//     userId: req.user._id,
//   });

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: newContact,
//   });
// };

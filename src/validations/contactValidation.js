// src/validations/contactValidation.js

import Joi from 'joi';

const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'IsFavourite must be a boolean value',
  }),
  contactType: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Contact type should be a string',
    'string.min': 'Contact type should have at least {#limit} characters',
    'string.max': 'Contact type should have at most {#limit} characters',
    'any.required': 'Contact type is required',
  }),
});

export default createContactsSchema;

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().min(3).max(20).optional(),
});

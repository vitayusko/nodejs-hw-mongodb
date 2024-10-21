// src/utils/saveFileToCloudinary.js

import cloudinary from 'cloudinary';
import { env } from './evn.js';
import { CLOUDINARY } from '../constants/index.js';
import fs from 'fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.cloudName),
  api_key: env(CLOUDINARY.apiKey),
  api_secret: env(CLOUDINARY.apiSecret),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    console.error('Ошибка загрузки на Cloudinary:', error);
    throw error;
  }
};

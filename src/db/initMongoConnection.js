import mongoose from 'mongoose';
import { MONGODB_DB_VARS } from '../constants/index.js';
import { env } from '../utils/evn.js';

export const initMongoDB = async () => {
  try {
    const user = env(MONGODB_DB_VARS.MONGODB_USER);
    const pwd = env(MONGODB_DB_VARS.MONGODB_PASSWORD);
    const url = env(MONGODB_DB_VARS.MONGODB_URL);
    const db = env(MONGODB_DB_VARS.MONGODB_DB);

    // Формування URI для підключення
    const mongoUri = `mongodb+srv://${user}:${pwd}@${url}/?retryWrites=true&w=majority&appName=Cluster0`;

    // Підключення до MongoDB через Mongoose
    await mongoose.connect(mongoUri, { dbName: db });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};

import mongoose from 'mongoose';
import { MONGODB_DB_VARS } from '../constants/index.js';
import { env } from '../utils/evn.js';


export const initMongoDB = async () => {
  try {
    const user = env(MONGODB_DB_VARS.MONGODB_USER);
    const pwd = env(MONGODB_DB_VARS.MONGODB_PASSWORD);
    const url = env(MONGODB_DB_VARS.MONGODB_URL);
    const db = env(MONGODB_DB_VARS.MONGODB_DB);

    // Выводим значения переменных окружения для отладки
    console.log('MongoDB connection details:', { user, pwd, url, db });

    const mongoUri = `mongodb+srv://${user}:${pwd}@${url}/?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(mongoUri, { dbName: db });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};

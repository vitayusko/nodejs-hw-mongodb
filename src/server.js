import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';
import { EVN_VARS } from './constants/index.js';
import { env } from './utils/evn.js';

const logger = pino();
const PORT = env(EVN_VARS.PORT, 3000);

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(pinoHttp({ logger }));

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error fetching contacts',
        error: error.message,
      });
    }
  });

  // Новый маршрут для получения контакта по ID
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error fetching contact',
        error: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  });

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

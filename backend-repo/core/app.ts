import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';
import { getFirestore } from 'firebase-admin/firestore';
import { ApiController } from '../controller/api';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getConfigs } from '../config/firebaseConfig';

const app = express();

const configs = getConfigs();
initializeApp({
  credential: applicationDefault(),
  ...configs,
});
export let fireStoreDb = getFirestore();

const apiController = new ApiController();

app.use(cors()); // Apply CORS middleware globally
app.use(express.json());

app.use('/api', userRoutes(apiController));

// Initialize Firebase Admin with emulator settings

if (process.env.ENVIRONMENT !== 'production') {
  fireStoreDb.settings({
    host: 'localhost:8080',

    ssl: false,
  });
}

export default app;

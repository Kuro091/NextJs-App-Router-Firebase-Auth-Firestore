import { AppOptions, credential } from 'firebase-admin';
import dotenv from 'dotenv';
import { Firestore } from 'firebase-admin/firestore';
dotenv.config();

const base64EncodedKey = process.env.SERVICE_ACCOUNT_KEY!;
const serviceAccount = JSON.parse(Buffer.from(base64EncodedKey, 'base64').toString('utf8'));

export const getConfigs: () => AppOptions = () => {
  return {
    credential: credential.cert(serviceAccount),
    projectId: process.env.PROJECT_ID,
  };
};

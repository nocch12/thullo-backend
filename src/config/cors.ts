import dotenv from 'dotenv';
import { CorsOptions } from 'cors';

dotenv.config();

export const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

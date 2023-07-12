import dotenv from 'dotenv';
import path from 'path';

const config = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;

export const APP_PORT = config ? config.PORT : 3600;

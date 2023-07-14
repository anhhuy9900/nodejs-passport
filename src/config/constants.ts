import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const config = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;

export const APP_PORT = config?.PORT || 3600;
export const JWT_PRV_KEY = fs.readFileSync(path.join(__dirname, '../../', 'id_jwt_priv.pem'), 'utf8');
export const JWT_PUB_KEY = fs.readFileSync(path.join(__dirname, '../../', 'id_jwt_pub.pem'), 'utf8');

export const FB_CLIENT_ID = config?.FB_CLIENT_ID || '';
export const FB_CLIENT_SECRET = config?.FB_CLIENT_SECRET || '';
export const FB_CALLBACK_URL = config?.FB_CALLBACK_URL || '';

export const GG_CLIENT_ID = config?.GG_CLIENT_ID || '';
export const GG_CLIENT_SECRET = config?.GG_CLIENT_SECRET || '';
export const GG_CALLBACK_URL = config?.GG_CALLBACK_URL || '';
export const GG_AUTHORIZATION_URL = config?.GG_AUTHORIZATION_URL || '';
export const GG_TOKEN_URL = config?.GG_TOKEN_URL || '';

export enum PROVIDERS {
    FACEBOOK = 'facebook',
    GOOGLE = 'google'
}
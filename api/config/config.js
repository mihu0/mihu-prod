import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT,
    MONGO_URL,
    JWT_SECRET,
    JWT_EXPIRE,
    EMAIL_PASSWORD,
    EMAIL_FROM,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN,
    STRIPE_SECRET_KEY,
} = process.env;
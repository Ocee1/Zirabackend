import { config } from 'dotenv';
config();

interface IConstants {
    SECRET_KEY: any,
}


export const {
    PORT,
    SECRET_KEY,
    MONGO_URI,
} = process.env;


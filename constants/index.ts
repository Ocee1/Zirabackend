import { config } from 'dotenv';
config();

interface IConstants {
    SECRET_KEY: any,
}
export const {
    PORT,
    SECRET_KEY,
} = process.env;
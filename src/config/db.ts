import { connect } from "mongoose";
import { config } from 'dotenv';
config();

const MONGO_URI: string = typeof(process.env.MONGO_URI);

const connectDB = (): Promise<typeof import('mongoose')> => connect(MONGO_URI);

export default connectDB;
import { connect } from "mongoose";
import { MONGO_URI } from '../constants'
const MONGO_URL: string = MONGO_URI as string;


const connectDB = (): Promise<typeof import('mongoose')> => connect(MONGO_URL);

export default connectDB;
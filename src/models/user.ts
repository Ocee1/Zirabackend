import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNum: string;
    country: string;
}


const schema = new Schema<IUser>(
    {
        firstname: {
            type: String,
            minlength: 2,
            maxlength: 20,
        },
        lastname: {
            type: String,
            minlength: 2,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNum: {
            type: String,
        },
    }
) 

export default model<IUser>('user', schema);
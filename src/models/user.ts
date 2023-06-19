import { Schema, model, Document } from 'mongoose';
import { compare } from 'bcrypt';
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNum: string;
    country: string;
    validatePassword(password: string): Promise<boolean>;
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
    },
    { timestamps: true, toJSON: { virtuals: true } },
);

schema.methods.validatePassword = async function (password: string): Promise<Boolean> {
    return await compare(password, this.password);
};

export default model<IUser>('user', schema);
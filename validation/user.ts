import Joi from '@hapi/joi';
import { ISignup, ISignin } from '../src/interfaces/validators';

class UserValidationSchema {
    constructor () {}
    public signupValidation = (data: ISignup): Joi.ValidationResult => {
        const schema = Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().trim().required(),
            password: Joi.string().min(6).required(),
            phoneNum: Joi.string().required(),
        });
        return schema.validate(data);
    };

    public signinValidation = (data: ISignin): Joi.ValidationResult => {
        const schema = Joi.object({
            email: Joi.string().email().trim().required(),
            password: Joi.string().min(6).trim().required(),
        })
        return schema.validate(data);
    }
}

export default UserValidationSchema;
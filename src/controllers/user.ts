import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import user from "../models/user";
import bcrypt from 'bcrypt';
import { error } from "console";


class UserController {
    constructor() {}
    protected service = new UserService();
    private model = user;

    public registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;

        try {
            // validate user data

            //check if email has been registered
            const isUser = await this.service.GetUserByEmail(body.email);
            if (isUser) return res.status(400).json({'msg': 'User already exists'});

            // hash password
            const hashedPassword = await bcrypt.hash(body.password, 10);

            const data = {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: hashedPassword,                
                phoneNum: body.phoneNumber,
            };

            const user = await this.service.saveToUserCollection(data);

            return res.status(201).json({'msg': 'User created'})
        } catch (error: any) {
            next(error.message)
        }
    }
}

export default UserController;
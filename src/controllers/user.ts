import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import user from "../models/user";
import bcrypt from 'bcrypt';
import UserValidationSchema from "../validation/user";
import { error } from "console";
import { sign, } from 'jsonwebtoken';

import Crypto from "../utils/encrypt";


class UserController {
    constructor() {}
    protected service = new UserService();
    protected userValidator = new UserValidationSchema();
    private model = user;
    public SECRET = process.env.SECRET;

    public registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;

        try {
            // validate user data
            const { error } = this.userValidator.signupValidation(body);
            if (error) return res.status(400).json({'msg': error.message});

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
            return res.status(500).json({ 'msg': error.message });
        }
    }

    public signinUser = async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        try {
            // validate user data
            const { error } = this.userValidator.signinValidation(body);
            if (error) return res.status(400).json({'msg': error.message});

            // check if the user exists
            const isUser = await this.service.GetUserByEmail(body.email);
            if(!isUser) return res.status(403).json({ 'msg': 'Incorrect login details'});

            // Verify password for signin
            const isPassword = await isUser.validatePassword(body.password);
            if(!isPassword) return res.status(400).json({ 'msg': 'Incorrect Login details'});

            const payload = {
                id: isUser.id,
                email: isUser.email,
            }

            // crate access and refresh token
            const accessToken = Crypto.encrypt(payload, '2h');
            const refreshTok = Crypto.encrypt(payload, '2d');
            isUser.refreshToken = refreshTok as unknown as string;
            await isUser.save();

            // save refresh token in cookie for 2days
            res.cookie('jwt', refreshTok, {
                httpOnly: true,
                maxAge: 48*60*60*1000
            })

            return res.status(200).json({accessToken, 'msg': 'Logged In Successfully'});

        } catch (error: any) {
            return res.status(500).json({ 'msg': error.message });
        }
    }
}

export default UserController;
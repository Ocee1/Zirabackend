import { Request, Response, Router } from "express";
import UserController from "../controllers/user";
import { IRoutes } from "../interfaces/routes";

class UserRouter implements IRoutes {
    public router = Router();
    private userController = new UserController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`/user/signup`, this.userController.registerUser);
        this.router.post(`/user/signin`, this.userController.signinUser);
    }
}

export default UserRouter;
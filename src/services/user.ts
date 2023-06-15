import user, { IUser } from '../models/user';


class UserService {
    constructor() {}
    protected model = user;

    public saveToUserCollection = async(data: any) => {
        const result = await this.model.create(data);
        return result;
    };

    public GetUserByEmail = async(email: string) => {
        const user: IUser | null = await this.model.findOne({ email });
        return user;
    };

    public getUserById = async(id: string) => {
        const user: IUser | null = await this.model.findById(id).select('-password');
        return user;
    };
}

export default UserService;
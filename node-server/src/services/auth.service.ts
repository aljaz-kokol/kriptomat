import User, {UserDocument} from "../models/user.model";

export class AuthService {
    private static _instance: AuthService;
    private constructor() {}

    public static get get(): AuthService {
        if (!AuthService._instance)
            AuthService._instance = new AuthService();
        return AuthService._instance;
    }

    // public createUser(username: string, email: string, password: string): Promise<UserDocument> {
    //         if (await User.findOne({}))
    // }

}

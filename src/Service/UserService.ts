import {IToken, IUser} from "../Interface";
import {ObjectId} from "mongodb";
import {UserModel} from "../Model";
import jwt from "jsonwebtoken";


export class UserService {

    async getAllUsers() {
        return await new UserModel().getUsers();
    }

    async getUser(token: string): Promise<IUser | null> {
        try {
            const decode: IToken = jwt.verify(token, process.env.SECRET_KEY!) as IToken;
            return await new UserModel().getUserInfo(decode.user_id);
        } catch (e) {
            return null;
        }
    }

    async updateUser(id: ObjectId, user:IUser) {
        return await new UserModel().changeUserData(id, user);
    }

}
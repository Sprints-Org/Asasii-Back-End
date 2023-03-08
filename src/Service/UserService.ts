import {IProduct, IUser} from "../Interface";
import {ObjectId, UpdateResult, WithId} from "mongodb";
import {ProductModel, UserModel} from "../Model";
import jwt, {JwtPayload} from "jsonwebtoken";
import {IToken} from "../Interface/IToken";


export class UserService {

    async getAllUsers() {
        const users: WithId<IUser>[] = await new UserModel().getUsers();
        return users;
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
        const users: UpdateResult = await new UserModel().changeUserData(id, user);
        return users;
    }

}
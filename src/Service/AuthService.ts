import {IUser} from "../Interface";
import {ObjectId} from "mongodb";
import {UserModel} from "../Model";
import jwt from "jsonwebtoken";

export class AuthService {
    async registerUser(user: IUser): Promise<{ userId: string, token: string }> {
        const newUser: ObjectId = await new UserModel().createUser(user);
        const userId: string = newUser.toHexString();
        return {userId: userId, token: jwt.sign({user_id: userId}, process.env.SECRET_KEY!)};
    }
}
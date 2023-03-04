import {IUser} from "../Interface";
import {ObjectId, WithId} from "mongodb";
import {UserModel} from "../Model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService {

    generateToken(userId: string): { userId: string, token: string } {
        return {userId: userId, token: jwt.sign({user_id: userId}, process.env.SECRET_KEY!)};
    }
    async registerUser(user: IUser): Promise<{ userId: string, token: string }> {
        user.password = await bcrypt.hash(user.password, 10);
        const newUser: ObjectId = await new UserModel().createUser(user);
        return this.generateToken(newUser.toHexString());
    }

    async loginUser(email: string, password: string): Promise<{ userId: string, token: string } | null> {
        const user: WithId<IUser> | null = await new UserModel().getUserInfo(email);
        const pass: boolean = await bcrypt.compare(password, user?.password!);
        if (pass) {
            return this.generateToken(user?._id.toHexString()!);
        }
        return null;

    }
}
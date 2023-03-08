import {UserModel} from "../Model";
import {WithId} from "mongodb";
import {IUser} from "../Interface";

export class ValidationService {
    async checkUser(email: string): Promise<boolean> {
        const user: WithId<IUser> | null = await new UserModel().checkEmail(email);
        return user != null;
    }
}
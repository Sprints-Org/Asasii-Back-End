import {MongoDB} from "../Database/MongoDB";
import {Db, WithId} from "mongodb";
import {IUser} from "../Interface";

export class UserModel {

    async connectDB(): Promise<Db> {
        return await new MongoDB().client();
    }

    // async getUserInfo(user: IUser): Promise<WithId<IUser> | null> {
    //     return await this.connectDB().then(async db => {
    //         return await db.collection('users').findOne<IUser>({email: user.email});
    //     });
    // }


    async checkEmail(user: IUser): Promise<WithId<IUser> | null> {
        return await this.connectDB().then(async db => {
            return await db.collection('users').findOne<IUser>({email: user});
        });
    }

    // async createUser(user: IUser): Promise<WithId<IUser> | null> {
    //     return await this.connectDB().then(async db => {
    //         return await db.collection('users').findOne<IUser>({email: user});
    //     });
    // }

}

import {MongoDB} from "../Database/MongoDB";
import {Collection, ObjectId, WithId} from "mongodb";
import {IUser} from "../Interface";

export class UserModel {

    private collectionName: string = 'users';

    async getUserInfo(email: string): Promise<WithId<IUser> | null> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        return await collection.findOne<IUser>({email: email});
    }

    async createUser(user: IUser): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        const newUser = await collection.insertOne(user);
        return newUser.insertedId;
    }

}

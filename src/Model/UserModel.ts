import {MongoDB} from "../Database/MongoDB";
import {Collection, ObjectId, WithId} from "mongodb";
import {IUser} from "../Interface";
import jwt from "jsonwebtoken";

export class UserModel {

    private collectionName: string = 'users';

    // async getUserInfo(userId: ObjectId): Promise<WithId<IUser> | null> {
    //     const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
    //     return await collection.findOne<IUser>({_id: userId});
    // }


    async checkEmail(email: string): Promise<WithId<IUser> | null> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        return await collection.findOne<IUser>({email: email});
    }

    async createUser(user: IUser): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        const newUser = await collection.insertOne(user);
        return newUser.insertedId;
    }

    // async loginUser(user: Object): Promise<string> {
    //     return await this.connectDB().then(async db => {
    //         const newUser = await db.collection('users').insertOne(user);
    //         const userId: string = newUser.insertedId.id.toString();
    //         return jwt.sign({user_id: userId}, process.env.SECRET_KEY!);
    //     });
    // }

}

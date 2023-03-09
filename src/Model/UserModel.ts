import {MongoDB} from "../Database/MongoDB";
import {Collection, Document, FindOptions, ObjectId, WithId} from "mongodb";
import {IUser} from "../Interface";
import {User} from "../Routes/API/User";

export class UserModel {

    private collectionName: string = 'users';

    async checkEmail(email: string): Promise<WithId<IUser> | null> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        return await collection.findOne<IUser>({email: email});
    }

    async getUserInfo(id: string): Promise<WithId<IUser> | null> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        return await collection.findOne<IUser>({_id: new ObjectId(id)});
    }

    async getUsers(): Promise<WithId<IUser>[]> {
        const collection: Collection = await new MongoDB().client<WithId<IUser>>(this.collectionName);
        return await collection.find<WithId<IUser>>({}, {
            projection: {
                firstName: 1,
                lastName: 1,
                email: 1,
                admin: 1,
            }
        }).toArray();
    }

    async createUser(user: IUser): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        const newUser = await collection.insertOne(user);
        return newUser.insertedId;
    }

    async changeUserData(id: ObjectId,user: IUser) {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        const newUser = await collection.updateOne({_id:id}, {$set:{firstName:user.firstName, lastName:user.lastName, email:user.email}});
        return newUser;
    }

}

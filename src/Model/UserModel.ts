import {MongoDB} from "../Database";
import {Collection, ObjectId, WithId} from "mongodb";
import {IDb, IUser} from "../Interface";

export class UserModel implements IDb {

    private collectionName: string = 'users';
    public connect: MongoDB = new MongoDB();

    async checkEmail(email: string): Promise<WithId<IUser> | null> {
        const collection: Collection = await this.connect.client<IUser>(this.collectionName);
        return await collection.findOne<IUser>({email: email}).finally(this.connect.closeConnection());
    }

    async getUserInfo(id: string): Promise<WithId<IUser> | null> {
        const collection: Collection = await this.connect.client<IUser>(this.collectionName);
        const userInfo = await collection.findOne<IUser>({_id: new ObjectId(id)}).finally(this.connect.closeConnection());
        return userInfo;
    }

    async getUsers(): Promise<WithId<IUser>[]> {
        const collection: Collection = await this.connect.client<WithId<IUser>>(this.collectionName);
        await this.connect.closeConnection();
        return await collection.find<WithId<IUser>>({}, {
            projection: {
                firstName: 1,
                lastName: 1,
                email: 1,
                admin: 1,
            }
        }).toArray().finally(this.connect.closeConnection());
    }

    async createUser(user: IUser): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        const newUser = await collection.insertOne(user).finally(this.connect.closeConnection());
        return newUser.insertedId;
    }

    async changeUserData(id: ObjectId, user: IUser) {
        const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
        return await collection.updateOne({_id: id}, {
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }).finally(this.connect.closeConnection());
    }

}

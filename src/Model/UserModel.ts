import {MongoDB} from "../Database/MongoDB";
import {Db, WithId} from "mongodb";
import {Document} from "bson";

export class UserModel {
    public db?:Db;

    async connectDB(): Promise<Db> {
        return await new MongoDB().client();
    }
    async getUserInfo(username: string, email: string): Promise<WithId<Document> | null> {
        return await this.db!.collection('users').findOne({$or: [{email: email}, {username: username}]});
    }

    async checkUsername(username: string): Promise<WithId<Document> | null> {
        this.db = await this.connectDB();
        return await this.db!.collection('users').findOne({username: username});
    }

    async checkEmail(email: string): Promise<WithId<Document> | null> {
        this.db = await this.connectDB();
        return await this.db!.collection('users').findOne({email: email});
    }

}

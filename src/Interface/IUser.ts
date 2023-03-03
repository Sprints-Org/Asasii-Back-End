import {ObjectId, Document} from "mongodb";

export interface IUser extends Document{
    _id: ObjectId;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    admin: boolean;
}
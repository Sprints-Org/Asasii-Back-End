import {ObjectId, Document} from "mongodb";

export interface ICategory extends Document {
    _id: ObjectId;
    name: string;
    image?: string;
}
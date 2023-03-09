import {ObjectId, Document} from "mongodb";

export interface IProduct extends Document {
    _id: ObjectId;
    name: string;
    image: string;
    price: number,
    quantity: number,
    colors: string[],
    description: string,
    additional_info: object,
    category_name: string,
}
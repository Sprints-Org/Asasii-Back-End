import {ObjectId} from "mongodb";

export interface IOrderProduct {
    _id: ObjectId
    price: number;
    quantity:number;
}
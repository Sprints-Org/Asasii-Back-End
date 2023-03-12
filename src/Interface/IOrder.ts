import {ObjectId} from "mongodb";
import {IShipping} from "./IShipping";
import {IOrderProduct} from "./IOrderProduct";

export interface IOrder {

    _id: ObjectId;
    products: IOrderProduct[];
    shipping_info: IShipping;
    sub_total: number;
    shipping: number;
    total: number;
    status: string;
}


import {IOrder} from "../Interface";
import {ObjectId} from "mongodb";
import {OrderModel} from "../Model/OrderModel";


export class OrderService {

    async createOrder(order: IOrder) {
        const orderId: ObjectId = await new OrderModel().createOrder(order);
        return orderId.toHexString();
    }


}
import {MongoDB} from "../Database";
import {Collection, ObjectId} from "mongodb";
import {IDb, IOrder} from "../Interface";

export class OrderModel implements IDb {

    private collectionName: string = 'orders';
    public connect: MongoDB = new MongoDB();

    async createOrder(order: IOrder): Promise<ObjectId> {
        const collection: Collection = await this.connect.client<IOrder>(this.collectionName);
        const newOrder = await collection.insertOne(order).finally(this.connect.closeConnection());
        return newOrder.insertedId;
    }
}
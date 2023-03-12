import {Request, Response} from "express";
import {OrderService} from "../Service/OrderService";
import {IOrder} from "../Interface";
import {ObjectId} from "mongodb";


export class OrderController {
    async add(req: Request, res: Response): Promise<Response> {
        const order: IOrder = {
            _id: new ObjectId(),
            products: req.body.products,
            shipping: req.body.shipping,
            shipping_info: req.body.shipping_info,
            status: req.body.status,
            sub_total: req.body.sub_total,
            total: req.body.total
        }
        return res.json(await new OrderService().createOrder(order));

    }
}
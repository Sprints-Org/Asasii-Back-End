"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderService_1 = require("../Service/OrderService");
const mongodb_1 = require("mongodb");
class OrderController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = {
                _id: new mongodb_1.ObjectId(),
                products: req.body.products,
                shipping: req.body.shipping,
                shipping_info: req.body.shipping_info,
                status: req.body.status,
                sub_total: req.body.sub_total,
                total: req.body.total
            };
            return res.json(yield new OrderService_1.OrderService().createOrder(order));
        });
    }
}
exports.OrderController = OrderController;

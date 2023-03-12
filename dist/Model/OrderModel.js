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
exports.OrderModel = void 0;
const Database_1 = require("../Database");
class OrderModel {
    constructor() {
        this.collectionName = 'orders';
        this.connect = new Database_1.MongoDB();
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            const newOrder = yield collection.insertOne(order).finally(this.connect.closeConnection());
            return newOrder.insertedId;
        });
    }
}
exports.OrderModel = OrderModel;

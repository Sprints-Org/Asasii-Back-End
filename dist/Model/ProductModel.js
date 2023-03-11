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
exports.ProductModel = void 0;
const Database_1 = require("../Database");
class ProductModel {
    constructor() {
        this.collectionName = 'products';
        this.connect = new Database_1.MongoDB();
    }
    createProduct(Product) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            const newProduct = yield collection.insertOne(Product).finally(this.connect.closeConnection());
            return newProduct.insertedId;
        });
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            return yield collection.find().toArray().finally(this.connect.closeConnection());
        });
    }
    getProductById(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            const Product = yield collection.find({ _id: ProductId }).toArray().finally(this.connect.closeConnection());
            console.log(Product);
            return Product;
        });
    }
    getProductBySearch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            return yield collection.find({ name: { $regex: key, $options: 'i' } }).toArray().finally(this.connect.closeConnection());
        });
    }
    editProduct(id, Product) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            const newProduct = yield collection.updateMany({ _id: id }, { $set: Product }).finally(this.connect.closeConnection());
            return newProduct.upsertedId;
        });
    }
    deleteProduct(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            return yield collection.deleteOne({ _id: ProductId }).finally(this.connect.closeConnection());
        });
    }
}
exports.ProductModel = ProductModel;

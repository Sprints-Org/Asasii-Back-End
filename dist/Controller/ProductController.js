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
exports.ProductController = void 0;
const mongodb_1 = require("mongodb");
const ProductService_1 = require("../Service/ProductService");
class ProductController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = {
                _id: new mongodb_1.ObjectId(),
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                quantity: req.body.quantity,
                colors: req.body.colors,
                description: req.body.description,
                additional_info: req.body.additional_info,
                category_name: req.body.category_name,
            };
            const data = yield new ProductService_1.ProductService().createProduct(Product);
            return res.json(data);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield new ProductService_1.ProductService().getAllProduct();
            return res.json(data);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield new ProductService_1.ProductService().getProductById(new mongodb_1.ObjectId(id));
            console.log(data);
            return res.json(data);
        });
    }
    getBySearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key } = req.params;
            const data = yield new ProductService_1.ProductService().getProductbysearch(key);
            return res.json(data);
        });
    }
}
exports.ProductController = ProductController;

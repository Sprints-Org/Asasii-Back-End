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
const Service_1 = require("../Service");
class ProductController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if all filed is exists
            if (!req.body.name ||
                !req.files ||
                !req.body.price ||
                !req.body.quantity ||
                !req.body.category_name) {
                return res.status(400).json({
                    error: "missing requirements",
                });
            }
            //check if the category of the product exist
            const categories = yield new Service_1.CategoryService().getAllCategory();
            if (categories.map((e) => e.name).indexOf(req.body.category_name) == -1) {
                return res.status(400).json({
                    error: "assign the product to existing category",
                });
            }
            //check the size of the image
            if (req.file && req.file.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                });
            }
            const Product = {
                _id: new mongodb_1.ObjectId(),
                name: req.body.name,
                image: req.filename,
                price: req.body.price,
                quantity: req.body.quantity,
                colors: req.body.colors,
                description: req.body.description,
                additional_info: req.body.additional_info,
                category_name: req.body.category_name,
            };
            const data = yield new Service_1.ProductService().createProduct(Product);
            return res.json(data);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield new Service_1.ProductService().getAllProduct();
            return res.json(data);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield new Service_1.ProductService().getProductById(new mongodb_1.ObjectId(id));
            return res.json(data);
        });
    }
    getBySearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key } = req.params;
            const data = yield new Service_1.ProductService().getProductBySearch(key);
            return res.json(data);
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if all filed is exists
            if (!req.body.name ||
                !req.files ||
                !req.body.price ||
                !req.body.quantity ||
                !req.body.category_name) {
                return res.status(400).json({
                    error: "missing requirements",
                });
            }
            //check if the category of the product exist
            const categories = yield new Service_1.CategoryService().getAllCategory();
            if (categories.map((e) => e.name).indexOf(req.body.category_name) == -1) {
                return res.status(400).json({
                    error: "assign the product to existing category",
                });
            }
            //check the size of the image
            if (req.file && req.file.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                });
            }
            const { id } = req.params;
            const Product = {
                _id: new mongodb_1.ObjectId(id),
                name: req.body.name,
                image: req.filename,
                price: req.body.price,
                quantity: req.body.quantity,
                colors: req.body.colors,
                description: req.body.description,
                additional_info: req.body.additional_info,
                category_name: req.body.category_name,
            };
            const data = yield new Service_1.ProductService().editProduct(new mongodb_1.ObjectId(id), Product);
            return res.json(data);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield new Service_1.ProductService().deleteProduct(new mongodb_1.ObjectId(id));
            return res.json(data);
        });
    }
}
exports.ProductController = ProductController;

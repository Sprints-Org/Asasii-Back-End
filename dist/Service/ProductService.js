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
exports.ProductService = void 0;
const Model_1 = require("../Model");
class ProductService {
    createProduct(Product) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProductId = yield new Model_1.ProductModel().createProduct(Product);
            return newProductId.toHexString();
        });
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield new Model_1.ProductModel().getAllProduct();
            return products;
        });
    }
    getProductById(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield new Model_1.ProductModel().getProductById(ProductId);
            return Product;
        });
    }
    getProductbysearch(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield new Model_1.ProductModel().getProductbysearch(key);
            return Product;
        });
    }
    editProduct(id, updatedProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield new Model_1.ProductModel().editProduct(id, updatedProduct);
            return Product;
        });
    }
    deleteProduct(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield new Model_1.ProductModel().deleteProduct(ProductId);
            return Product;
        });
    }
}
exports.ProductService = ProductService;

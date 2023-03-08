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
exports.Product = void 0;
const BaseRouter_1 = require("../BaseRouter");
const ProductController_1 = require("../../Controller/ProductController");
const MulterMiddleware_1 = require("../../Middleware/MulterMiddleware");
class Product extends BaseRouter_1.BaseRouter {
    inject() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subApp.post('/', new MulterMiddleware_1.MulterMiddleware('category').inject(), new ProductController_1.ProductController().add);
            this.subApp.get('/', new ProductController_1.ProductController().getAll);
            this.subApp.get('/:id', new ProductController_1.ProductController().getById);
            this.subApp.get('/search/:key', new ProductController_1.ProductController().getBySearch);
        });
    }
    routePath() {
        return (super.routePath() + "/product");
    }
    getApp() {
        return super.getApp();
    }
}
exports.Product = Product;

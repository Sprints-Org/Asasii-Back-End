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
exports.Category = void 0;
const BaseRouter_1 = require("../BaseRouter");
const Controller_1 = require("../../Controller");
const MulterMiddleware_1 = require("../../Middleware/MulterMiddleware");
const ValidateCategory_1 = require("../../Middleware/ValidateCategory");
class Category extends BaseRouter_1.BaseRouter {
    inject() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subApp.post('/', new ValidateCategory_1.ValidateCategory().inject(), new MulterMiddleware_1.MulterMiddleware('category').inject(), new Controller_1.CategoryController().add);
            this.subApp.get('/', new Controller_1.CategoryController().getAll);
            this.subApp.get('/:id', new Controller_1.CategoryController().getById);
            this.subApp.get('/:Category_name/products', new Controller_1.CategoryController().getCategoryProducts);
            this.subApp.put('/:id', new MulterMiddleware_1.MulterMiddleware('category').inject(), new Controller_1.CategoryController().edit);
            this.subApp.delete('/:id', new Controller_1.CategoryController().delete);
        });
    }
    routePath() {
        return (super.routePath() + "/category");
    }
    getApp() {
        return super.getApp();
    }
}
exports.Category = Category;

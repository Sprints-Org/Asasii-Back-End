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
exports.CategoryService = void 0;
const Model_1 = require("../Model");
class CategoryService {
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategoryId = yield new Model_1.CategoryModel().createCategory(category);
            return newCategoryId.toHexString();
        });
    }
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield new Model_1.CategoryModel().getAllCategory();
            return categories;
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield new Model_1.CategoryModel().getCategoryById(categoryId);
            return category;
        });
    }
    getCategoryProducts(Category_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield new Model_1.CategoryModel().getCategoryProducts(Category_name);
            return category;
        });
    }
}
exports.CategoryService = CategoryService;

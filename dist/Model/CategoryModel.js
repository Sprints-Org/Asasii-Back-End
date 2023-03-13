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
exports.CategoryModel = void 0;
const MongoDB_1 = require("../Database/MongoDB");
class CategoryModel {
    constructor() {
        this.collectionName = 'category';
        this.connect = new MongoDB_1.MongoDB();
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            const newCategory = yield collection.insertOne(category).finally(this.connect.closeConnection());
            return newCategory.insertedId;
        });
    }
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            return yield collection.find().toArray().finally(this.connect.closeConnection());
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            return yield collection.find({ _id: categoryId }).toArray().finally(this.connect.closeConnection());
        });
    }
    getCategoryProducts(Category_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client('products');
            return yield collection.find({ category_name: Category_name }).toArray().finally(this.connect.closeConnection());
        });
    }
    editCategory(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            const newCategory = yield collection.updateMany({ _id: id }, { $set: category }).finally(this.connect.closeConnection());
            return newCategory.upsertedId;
        });
    }
    deleteCategory(CategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            return yield collection.deleteOne({ _id: CategoryId }).finally(this.connect.closeConnection());
        });
    }
}
exports.CategoryModel = CategoryModel;

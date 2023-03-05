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
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new MongoDB_1.MongoDB().client(this.collectionName);
            const newCategory = yield collection.insertOne(category);
            return newCategory.insertedId;
        });
    }
}
exports.CategoryModel = CategoryModel;

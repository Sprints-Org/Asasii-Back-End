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
exports.CategoryController = void 0;
const mongodb_1 = require("mongodb");
const CategoryService_1 = require("../Service/CategoryService");
class CategoryController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if all fileds is exist 
            if (!req.body.name || !req.files) {
                return res.status(400).json({
                    error: "missing requirements"
                });
            }
            //get the new path for the image
            const files = req.files;
            const file = files[0];
            const Category = {
                _id: new mongodb_1.ObjectId(),
                name: req.body.name,
                image: file.filename,
            };
            const data = yield new CategoryService_1.CategoryService().createCategory(Category);
            return res.json(data);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield new CategoryService_1.CategoryService().getAllCategory();
            return res.json(data);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield new CategoryService_1.CategoryService().getCategoryById(new mongodb_1.ObjectId(id));
            console.log(data[0].image);
            return res.json(data);
        });
    }
    getCategoryProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Category_name } = req.params;
            const data = yield new CategoryService_1.CategoryService().getCategoryProducts(Category_name);
            return res.json(data);
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = "";
            return res.json(data);
        });
    }
}
exports.CategoryController = CategoryController;

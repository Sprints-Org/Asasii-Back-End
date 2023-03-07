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
    /*async add (req: Request, res: Response): Promise<Response> {
        const Category: ICategory = {
            _id: new ObjectId(),
            name: req.body.name,
            image: req.file?.path,
        }
        const data = await new CategoryService().createCategory(Category);
        return res.json(data);
    }*/
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Category = {
                _id: new mongodb_1.ObjectId(),
                name: req.body.name,
                image: req.body.image,
            };
            console.log(req.body.name);
            if (req.files) {
                const files = req.files;
                const file = files[0];
                console.log(file.filename);
            }
            // const data = await new CategoryService().createCategory(Category);
            return res.json({});
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
            res.sendFile(data[0].image, { root: __dirname });
            console.log(res);
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
}
exports.CategoryController = CategoryController;

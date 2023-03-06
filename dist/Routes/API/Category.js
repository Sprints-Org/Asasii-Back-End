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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const BaseRouter_1 = require("../BaseRouter");
const CategoryController_1 = require("../../Controller/CategoryController");
const multer_1 = __importDefault(require("multer"));
class Category extends BaseRouter_1.BaseRouter {
    inject() {
        return __awaiter(this, void 0, void 0, function* () {
            const storage = multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'public/files/categories');
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname);
                }
            });
            const UploadeImage = (0, multer_1.default)({ storage: storage });
            this.subApp.post('/', UploadeImage.single("image"), new CategoryController_1.CategoryController().add);
            this.subApp.get('/', new CategoryController_1.CategoryController().add);
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

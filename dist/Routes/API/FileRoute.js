"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRoute = void 0;
const BaseRouter_1 = require("../BaseRouter");
const express_1 = __importDefault(require("express"));
class FileRoute extends BaseRouter_1.BaseRouter {
    inject() {
        this.subApp.use('/categories', express_1.default.static(`${this.filePath()}/category`));
        this.subApp.use('/products', express_1.default.static(`${this.filePath()}/product`));
    }
    routePath() {
        return (super.routePath() + "/images");
    }
    filePath() {
        return super.filePath();
    }
    getApp() {
        return super.getApp();
    }
}
exports.FileRoute = FileRoute;

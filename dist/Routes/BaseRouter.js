"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = __importDefault(require("express"));
class BaseRouter {
    constructor() {
        this.subApp = (0, express_1.default)();
    }
    routePath() {
        return "/api";
    }
    filePath() {
        return "public/images";
    }
    getApp() {
        return this.subApp;
    }
}
exports.BaseRouter = BaseRouter;

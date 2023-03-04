"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const BaseRouter_1 = require("../BaseRouter");
const express_1 = __importDefault(require("express"));
class Files extends BaseRouter_1.BaseRouter {
    inject() {
        this.subApp.use('/images', express_1.default.static('public/files'));
    }
    routePath() {
        return (super.routePath() + "/files");
    }
    getApp() {
        return super.getApp();
    }
}
exports.Files = Files;

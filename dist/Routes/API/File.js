"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const BaseRouter_1 = require("../BaseRouter");
const express_1 = __importDefault(require("express"));
class File extends BaseRouter_1.BaseRouter {
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
exports.File = File;

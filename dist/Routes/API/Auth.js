"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const BaseRouter_1 = require("../BaseRouter");
const Validation_1 = require("../../Validation");
const Controller_1 = require("../../Controller");
const multer_1 = __importDefault(require("multer"));
class Auth extends BaseRouter_1.BaseRouter {
    inject() {
        this.subApp.post('/register', (0, multer_1.default)({ dest: "public/files" }).fields([{ name: 'email' }, { name: 'email1' }]), new Validation_1.RegisterValidation().inject(), new Controller_1.AuthController().register);
    }
    routePath() {
        return (super.routePath() + "/auth");
    }
    getApp() {
        return super.getApp();
    }
}
exports.Auth = Auth;

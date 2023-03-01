"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const BaseRouter_1 = require("../BaseRouter");
const Validation_1 = require("../../Validation");
const AuthController_1 = require("../../Controller/AuthController");
class Auth extends BaseRouter_1.BaseRouter {
    inject() {
        this.subApp.post('/register', new Validation_1.RegisterValidation().inject(), new AuthController_1.AuthController().register);
    }
    routePath() {
        return (super.routePath() + "/auth");
    }
    getApp() {
        return super.getApp();
    }
}
exports.Auth = Auth;

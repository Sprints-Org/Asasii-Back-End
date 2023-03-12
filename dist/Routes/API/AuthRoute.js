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
exports.AuthRoute = void 0;
const BaseRouter_1 = require("../BaseRouter");
const Controller_1 = require("../../Controller");
const Middleware_1 = require("../../Middleware");
class AuthRoute extends BaseRouter_1.BaseRouter {
    inject() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subApp.post('/register', yield new Middleware_1.RegisterMiddleware().inject(), new Controller_1.AuthController().register);
            this.subApp.post('/login', yield new Middleware_1.LogInMiddleware().inject(), new Controller_1.AuthController().logIn);
        });
    }
    routePath() {
        return (super.routePath() + "/auth");
    }
    getApp() {
        return super.getApp();
    }
}
exports.AuthRoute = AuthRoute;

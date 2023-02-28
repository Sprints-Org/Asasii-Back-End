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
exports.Auth = void 0;
const BaseRouter_1 = require("../BaseRouter");
const MongoDB_1 = require("../../Database/MongoDB");
class Auth extends BaseRouter_1.BaseRouter {
    inject() {
        this.subApp.get('/register', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const u = yield (new MongoDB_1.MongoDB().client());
                res.send('welcome');
            });
        });
    }
    routePath() {
        return (super.routePath() + "/auth");
    }
    getApp() {
        return super.getApp();
    }
}
exports.Auth = Auth;

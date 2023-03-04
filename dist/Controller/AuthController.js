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
exports.AuthController = void 0;
const mongodb_1 = require("mongodb");
const AuthService_1 = require("../Service/AuthService");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                _id: new mongodb_1.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password1,
                admin: false,
            };
            const data = yield new AuthService_1.AuthService().registerUser(user);
            return res.json(data);
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield new AuthService_1.AuthService().loginUser(req.body.email, req.body.password);
            if (data == null) {
                res.status(400);
                return res.json({ "msg": "check your login data" });
            }
            return res.json(data);
        });
    }
}
exports.AuthController = AuthController;

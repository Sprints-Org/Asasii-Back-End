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
exports.CheckUserMiddleware = void 0;
const AuthService_1 = require("../Service/AuthService");
class CheckUserMiddleware {
    constructor(admin) {
        this.admin = admin;
    }
    checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization) {
                return res.status(400).json({
                    msg: "Invaled token"
                });
            }
            else {
                const user = yield new AuthService_1.AuthService().getUser(req.headers.authorization.split(" ")[1]);
                if (user == null) {
                    return res.status(400).json({
                        msg: "Invaled token"
                    });
                }
                else if (this.admin) {
                    if (this.admin == (user === null || user === void 0 ? void 0 : user.admin)) {
                        // @ts-ignore
                        req.user = user;
                        next();
                    }
                    else {
                        return res.status(400).json({
                            msg: "not admin"
                        });
                    }
                }
                else {
                    // @ts-ignore
                    req.user = user;
                    next();
                }
            }
        });
    }
    ;
    inject() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization) {
                return res.status(400).json({
                    msg: "Invaled token"
                });
            }
            else {
                const user = yield new AuthService_1.AuthService().getUser(req.headers.authorization.split(" ")[1]);
                if (user == null) {
                    return res.status(400).json({
                        msg: "Invaled token"
                    });
                }
                else if (this.admin) {
                    if (this.admin == (user === null || user === void 0 ? void 0 : user.admin)) {
                        // @ts-ignore
                        req.user = user;
                        next();
                    }
                    else {
                        return res.status(400).json({
                            msg: "not admin"
                        });
                    }
                }
                else {
                    // @ts-ignore
                    req.user = user;
                    next();
                }
            }
        });
    }
}
exports.CheckUserMiddleware = CheckUserMiddleware;

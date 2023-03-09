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
const Service_1 = require("../Service");
class CheckUserMiddleware {
    constructor(admin) {
        this.admin = admin;
    }
    checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization) {
                return res.status(400).json({
                    msg: "Invalid token"
                });
            }
            else {
                const header = req.headers;
                const user = yield new Service_1.UserService().getUser(header.authorization.split(" ")[1]);
                const isAdmin = user === null || user === void 0 ? void 0 : user.admin;
                if (user == null) {
                    return res.status(400).json({
                        msg: "Invalid token"
                    });
                }
                else if (this.admin) {
                    if (this.admin == isAdmin) {
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
                    req.user = user;
                    next();
                }
            }
        });
    }
    inject() {
        return (req, res, next) => {
            return this.checkUser(req, res, next);
        };
    }
}
exports.CheckUserMiddleware = CheckUserMiddleware;

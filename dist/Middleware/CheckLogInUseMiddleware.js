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
exports.CheckLogInUseMiddleware = void 0;
const Service_1 = require("../Service");
class CheckLogInUseMiddleware {
    checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.params;
            if (!req.headers.authorization) {
                return res.status(400).json({
                    msg: "Invalid token"
                });
            }
            else {
                const token = req.headers;
                const user = yield new Service_1.UserService().getUser(token.authorization.split(" ")[1]);
                const _id = user === null || user === void 0 ? void 0 : user._id;
                if (user == null) {
                    return res.status(400).json({
                        msg: "Invalid token"
                    });
                }
                else if ((_id === null || _id === void 0 ? void 0 : _id.toHexString()) === id) {
                    req.user = user;
                    next();
                }
                else {
                    return res.status(400).json({
                        msg: "m3lsh"
                    });
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
exports.CheckLogInUseMiddleware = CheckLogInUseMiddleware;

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
exports.UserController = void 0;
const mongodb_1 = require("mongodb");
const Service_1 = require("../Service");
class UserController {
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Service_1.UserService().getUser(req.headers.authorization);
            return res.json(yield new Service_1.UserService().getAllUsers());
        });
    }
    updateUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = {
                _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                admin: (_b = req.user) === null || _b === void 0 ? void 0 : _b.admin,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: ""
            };
            const updateUser = new Service_1.UserService().updateUser(new mongodb_1.ObjectId(id), user);
            return res.json({ x: updateUser });
        });
    }
}
exports.UserController = UserController;

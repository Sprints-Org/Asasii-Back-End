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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Model_1 = require("../Model");
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const encryptedPassword = yield bcrypt_1.default.hash(req.body.password1, 10);
            const user = {
                _id: new mongodb_1.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: encryptedPassword,
                admin: false,
            };
            return res.json({
                token: yield new Model_1.UserModel().createUser(user)
            });
        });
    }
}
exports.AuthController = AuthController;

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
exports.RegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const Model_1 = require("../Model");
class RegisterValidation {
    constructor() {
        this.userExist = null;
    }
    inject() {
        return [(0, express_validator_1.body)('email', 'Check your e-mail').isEmail(),
            (0, express_validator_1.body)('email', 'Enter your e-mail').exists(),
            (0, express_validator_1.body)('email', 'E-mail already used before').custom((value) => this.emailCheck(value)),
            (0, express_validator_1.body)('username', 'Enter your username').exists(),
            (0, express_validator_1.body)('username', 'Username could not contain spaces').custom(value => !/\s/.test(value)),
            (0, express_validator_1.body)('username', 'Username already used before').custom((value) => this.usernameCheck(value)),
            (0, express_validator_1.body)('password1', 'Enter your password').exists(),
            (0, express_validator_1.body)('password1', 'Password does not match').custom((value, req) => this.passwordCheck(value, req))];
    }
    passwordCheck(value, req) {
        if (value !== req.req.body.password1) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }
    usernameCheck(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userExist = yield new Model_1.UserModel().checkUsername(value);
            if (this.userExist != null) {
                throw new Error('Username already used before');
            }
            return true;
        });
    }
    emailCheck(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userExist = yield new Model_1.UserModel().checkEmail(value);
            if (this.userExist != null) {
                throw new Error('E-mail already used before');
            }
            return true;
        });
    }
}
exports.RegisterValidation = RegisterValidation;

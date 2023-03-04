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
exports.AuthMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Model_1 = require("../Model");
class AuthMiddleWare {
    authMiddleWare(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, express_validator_1.body)('email', 'Enter your e-mail').exists().bail().isEmail().withMessage('Check your e-mail').bail();
            yield (0, express_validator_1.body)('email').custom((value) => new AuthMiddleWare().emailCheck(value)).run(req);
            (0, express_validator_1.body)('firstName', 'Enter your first name').exists();
            (0, express_validator_1.body)('lastName', 'Enter your last name').exists();
            (0, express_validator_1.body)('password1', 'Enter your password').exists();
            (0, express_validator_1.body)('password2', 'Password does not match').exists();
            (0, express_validator_1.body)('password1').custom((value, req) => new AuthMiddleWare().passwordCheck(value, req));
            console.log((0, express_validator_1.validationResult)(req));
            // req.errors = errors
            // console.log(errors);
            // const y = validationResult(req);
            // console.log(y);
            // // if (!validationResult(er.isEmpty()) {
            // //     console.log('ahmed2');
            // //     return res.status(400).json({errors: errors.array()});
            // // }
            // // return next();
        });
    }
    ;
    inject() {
        return this.authMiddleWare;
    }
    passwordCheck(value, req) {
        if (value != req.req.body.password2) {
            throw new Error("Password does not match");
        }
        return true;
    }
    emailCheck(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield new Model_1.UserModel().checkEmail(value);
            if (userExist != null) {
                throw new Error("E-mail already used before");
            }
            return true;
        });
    }
}
exports.AuthMiddleWare = AuthMiddleWare;

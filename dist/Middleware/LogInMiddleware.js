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
exports.LogInMiddleware = void 0;
const express_validator_1 = require("express-validator");
const Service_1 = require("../Service");
class LogInMiddleware {
    authMiddleWare(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, express_validator_1.body)('email', 'Enter your e-mail').exists().bail().isEmail().withMessage('Check your e-mail').bail().run(req);
            yield (0, express_validator_1.body)('email').custom((value) => new LogInMiddleware().emailCheck(value)).run(req);
            yield (0, express_validator_1.body)('password', 'Enter your password').exists().run(req);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return next();
        });
    }
    ;
    inject() {
        return this.authMiddleWare;
    }
    emailCheck(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield new Service_1.ValidationService().checkUser(value);
            if (!userExist) {
                throw new Error("Check login information");
            }
            return true;
        });
    }
}
exports.LogInMiddleware = LogInMiddleware;

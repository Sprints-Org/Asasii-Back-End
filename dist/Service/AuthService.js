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
exports.AuthService = void 0;
const Model_1 = require("../Model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    generateToken(userId) {
        return { userId: userId, token: jsonwebtoken_1.default.sign({ user_id: userId }, process.env.SECRET_KEY) };
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield bcrypt_1.default.hash(user.password, 10);
            const newUser = yield new Model_1.UserModel().createUser(user);
            return this.generateToken(newUser.toHexString());
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield new Model_1.UserModel().checkEmail(email);
            const pass = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (pass) {
                return this.generateToken(user === null || user === void 0 ? void 0 : user._id.toHexString());
            }
            return null;
        });
    }
    getUserInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                // @ts-ignore
                return yield new Model_1.UserModel().getUserInfo(userToken.user_id);
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.AuthService = AuthService;

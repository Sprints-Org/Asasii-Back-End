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
class AuthService {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield new Model_1.UserModel().createUser(user);
            const userId = newUser.toHexString();
            return { userId: userId, token: jsonwebtoken_1.default.sign({ user_id: userId }, process.env.SECRET_KEY) };
        });
    }
}
exports.AuthService = AuthService;

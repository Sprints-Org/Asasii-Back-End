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
exports.UserModel = void 0;
const MongoDB_1 = require("../Database/MongoDB");
class UserModel {
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new MongoDB_1.MongoDB().client();
        });
    }
    getUserInfo(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.collection('users').findOne({ $or: [{ email: email }, { username: username }] });
        });
    }
    checkUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield this.connectDB();
            return yield this.db.collection('users').findOne({ username: username });
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield this.connectDB();
            return yield this.db.collection('users').findOne({ email: email });
        });
    }
}
exports.UserModel = UserModel;

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
const Database_1 = require("../Database");
const mongodb_1 = require("mongodb");
class UserModel {
    constructor() {
        this.collectionName = 'users';
        this.connect = new Database_1.MongoDB();
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            return yield collection.findOne({ email: email }).finally(this.connect.closeConnection());
        });
    }
    getUserInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.connect.client(this.collectionName);
            const userInfo = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) }).finally(this.connect.closeConnection());
            return userInfo;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            yield this.connect.closeConnection();
            return yield collection.find({}, {
                projection: {
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    admin: 1,
                }
            }).toArray().finally(this.connect.closeConnection());
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            const newUser = yield collection.insertOne(user).finally(this.connect.closeConnection());
            return newUser.insertedId;
        });
    }
    changeUserData(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new Database_1.MongoDB().client(this.collectionName);
            return yield collection.updateOne({ _id: id }, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }).finally(this.connect.closeConnection());
        });
    }
}
exports.UserModel = UserModel;

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
    constructor() {
        this.collectionName = 'users';
        // async loginUser(user: Object): Promise<string> {
        //     return await this.connectDB().then(async db => {
        //         const newUser = await db.collection('users').insertOne(user);
        //         const userId: string = newUser.insertedId.id.toString();
        //         return jwt.sign({user_id: userId}, process.env.SECRET_KEY!);
        //     });
        // }
    }
    // async getUserInfo(userId: ObjectId): Promise<WithId<IUser> | null> {
    //     const collection: Collection = await new MongoDB().client<IUser>(this.collectionName);
    //     return await collection.findOne<IUser>({_id: userId});
    // }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new MongoDB_1.MongoDB().client(this.collectionName);
            return yield collection.findOne({ email: email });
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield new MongoDB_1.MongoDB().client(this.collectionName);
            const newUser = yield collection.insertOne(user);
            return newUser.insertedId;
        });
    }
}
exports.UserModel = UserModel;

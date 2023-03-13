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
exports.MongoDB = void 0;
const mongodb_1 = require("mongodb");
class MongoDB {
    client(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@asasii-a43b7503.mongo.ondigitalocean.com`;
            this.connection = yield new mongodb_1.MongoClient(uri).connect().then(connection => this.connection = connection);
            return this.connection.db('asasii').collection(collectionName);
        });
    }
    closeConnection() {
        return () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.close());
        });
    }
}
exports.MongoDB = MongoDB;

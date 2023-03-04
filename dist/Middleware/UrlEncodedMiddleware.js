"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlEncodedMiddleware = void 0;
const express_1 = __importDefault(require("express"));
class UrlEncodedMiddleware {
    urlEncodedMiddleWare() {
        return express_1.default.urlencoded({ extended: false });
    }
    ;
    inject() {
        return this.urlEncodedMiddleWare;
    }
}
exports.UrlEncodedMiddleware = UrlEncodedMiddleware;

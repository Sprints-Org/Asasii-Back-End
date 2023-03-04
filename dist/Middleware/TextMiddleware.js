"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMiddleware = void 0;
const express_1 = __importDefault(require("express"));
class TextMiddleware {
    inject() {
        return express_1.default.text();
    }
}
exports.TextMiddleware = TextMiddleware;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
class CorsMiddleware {
    inject() {
        return (0, cors_1.default)();
    }
}
exports.CorsMiddleware = CorsMiddleware;

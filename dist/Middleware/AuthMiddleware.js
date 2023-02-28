"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
class AuthMiddleWare {
    authMiddleWare(req, res, next) {
        next();
    }
    ;
    inject() {
        return this.authMiddleWare;
    }
}
exports.AuthMiddleWare = AuthMiddleWare;

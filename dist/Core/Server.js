"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
class Server {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
    }
    route(route) {
        route.inject();
        this.app.use(route.routePath(), route.getApp());
    }
    middleware(middleware) {
        this.app.use(middleware.inject());
    }
    start(port) {
        this.app.listen(port);
    }
}
exports.Server = Server;

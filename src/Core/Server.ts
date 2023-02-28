import express, {Express} from "express";
import {IRoute} from "../Interface"
import {IMiddleware} from "../Interface";


export class Server {
    private readonly app: Express;

    constructor() {
        this.app = express();
    }

    public route(route: IRoute) {
        route.inject();
        this.app.use(route.routePath(), route.getApp());
    }

    public middleware(middleware: IMiddleware) {
        this.app.use(middleware.inject());
    }

    public start(port: number) {
        this.app.listen(port);
    }
}
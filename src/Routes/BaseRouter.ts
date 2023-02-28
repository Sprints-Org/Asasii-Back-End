import express, {Application} from "express";

export abstract class BaseRouter {
    protected subApp:Application;
    constructor() {
        this.subApp = express();
    }

    routePath(): string {
        return "/api";
    }

    getApp():Application {
        return this.subApp;
    }
}
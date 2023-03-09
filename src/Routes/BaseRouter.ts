import express, {Application} from "express";

export abstract class BaseRouter {
    protected subApp: Application;

    constructor() {
        this.subApp = express();
    }

    routePath(): string {
        return "/api";
    }

    filePath(): string {
        return "public/images";
    }

    getApp(): Application {
        return this.subApp;
    }
}
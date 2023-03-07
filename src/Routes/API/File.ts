import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import express, {Application} from "express";


export class File extends BaseRouter implements IRoute {
    inject(): void {
        this.subApp.use('/categories', express.static(`${this.filePath()}/category`));
    }
    routePath(): string {
        return (super.routePath() + "/images");
    }

    filePath(): string {
        return super.filePath();
    }

    getApp(): Application {
        return super.getApp();
    }
}

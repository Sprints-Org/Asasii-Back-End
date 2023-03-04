import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import express, {Application} from "express";


export class File extends BaseRouter implements IRoute {
    inject(): void {
        this.subApp.use('/images', express.static('public/files'));
    }
    routePath(): string {
        return (super.routePath() + "/files");
    }

    getApp(): Application {
        return super.getApp();
    }
}


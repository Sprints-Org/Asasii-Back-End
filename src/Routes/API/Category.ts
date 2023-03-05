import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import { CategoryController } from "../../Controller/CategoryController";


export class Category extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.post('/', new CategoryController().add);
    }
    routePath(): string {
        return (super.routePath() + "/category");
    }

    getApp(): Application {
        return super.getApp();
    }
}


import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {CheckUserMiddleware} from "../../Middleware";
import {OrderController} from "../../Controller/OrderController";

export class OrderRoute extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.post('/', new CheckUserMiddleware(false).inject(), new OrderController().add);
    }

    routePath(): string {
        return (super.routePath() + "/order");
    }

    getApp(): Application {
        return super.getApp();
    }
}


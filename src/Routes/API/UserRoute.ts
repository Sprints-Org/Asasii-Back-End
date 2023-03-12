import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {UserController} from "../../Controller";
import {CheckLogInUseMiddleware, CheckUserMiddleware} from "../../Middleware";

export class UserRoute extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.get('/users', new CheckUserMiddleware(true).inject(), new UserController().users);
        this.subApp.patch('/user/:id', new CheckLogInUseMiddleware().inject(), new UserController().updateUser);
    }

    routePath(): string {
        return (super.routePath() + "/user");
    }

    getApp(): Application {
        return super.getApp();
    }
}


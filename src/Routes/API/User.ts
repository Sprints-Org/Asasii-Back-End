import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {AuthController, UserController} from "../../Controller";
import {RegisterMiddleware, LogInMiddleware, CheckUserMiddleware} from "../../Middleware";
import {CheckLogInUseMiddleware} from "../../Middleware/CheckLogInUseMiddleware";

export class User extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.get('/users', new CheckUserMiddleware(true).inject(), new UserController().users);
        this.subApp.patch('/user/:id',new CheckLogInUseMiddleware().inject(), new UserController().updateUser);
    }
    routePath(): string {
        return (super.routePath() + "/user");
    }

    getApp(): Application {
        return super.getApp();
    }
}


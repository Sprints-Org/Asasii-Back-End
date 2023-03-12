import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {AuthController} from "../../Controller";
import {RegisterMiddleware, LogInMiddleware} from "../../Middleware";

export class AuthRoute extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.post('/register', await new RegisterMiddleware().inject(), new AuthController().register);
        this.subApp.post('/login',await new LogInMiddleware().inject(), new AuthController().logIn);
    }
    routePath(): string {
        return (super.routePath() + "/auth");
    }

    getApp(): Application {
        return super.getApp();
    }
}


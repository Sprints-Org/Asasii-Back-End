import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {RegisterValidation} from "../../Validation";
import {AuthController} from "../../Controller";

export class Auth extends BaseRouter implements IRoute {
    inject(): void {
        this.subApp.post('/register', new RegisterValidation().inject(),  new AuthController().register);
    }
    routePath(): string {
        return (super.routePath() + "/auth");
    }

    getApp(): Application {
        return super.getApp();
    }
}


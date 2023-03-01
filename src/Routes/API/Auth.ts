import {BaseRouter} from "../BaseRouter";
import {IRoute, IUser} from "../../Interface";
import {Application, Request, Response} from "express";
import {MongoDB} from "../../Database/MongoDB";
import {RegisterValidation} from "../../Validation";
import {validationResult} from "express-validator";
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


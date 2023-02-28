import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application, Request, Response} from "express";
import {MongoDB} from "../../Database/MongoDB";

export class Auth extends BaseRouter implements IRoute {
    inject(): void {
        this.subApp.get('/register', async function (req: Request, res: Response) {
            const u = await (new MongoDB().client());
            res.send('welcome');
        })
    }
    routePath(): string {
        return (super.routePath() + "/auth");
    }

    getApp(): Application {
        return super.getApp();
    }
}


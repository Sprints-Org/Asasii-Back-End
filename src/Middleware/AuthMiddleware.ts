import {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";


export class AuthMiddleWare implements IMiddleware {

    authMiddleWare(req: Request, res: Response, next: NextFunction) {
        next();
    };

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return this.authMiddleWare;
    }
}
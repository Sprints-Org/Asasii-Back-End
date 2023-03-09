import {IMiddleware} from "../Interface";
import {NextFunction, Request, Response} from "express";
import {AuthService} from "../Service/AuthService";
import {UserModel} from "../Model";
import {UserService} from "../Service";
import {IRequest} from "../Interface/IRequest";

export class CheckUserMiddleware implements IMiddleware {
    public admin: boolean;

    constructor(admin: boolean) {
        this.admin = admin;

    }

    async checkUser(req: IRequest, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            return res.status(400).json({
                msg: "Invaled token"
            });
        } else {
            const user = await new UserService().getUser(req.headers.authorization.split(" ")[1]);
            if (user == null) {
                return res.status(400).json({
                    msg: "Invaled token"
                });
            } else if (this.admin) {
                if (this.admin == user.admin) {
                    req.user = user;
                    next();
                } else {
                    return res.status(400).json({
                        msg: "not admin"
                    });
                }
            } else {
                req.user = user;
                next();
            }
        }
    }

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            return this.checkUser(req, res, next);
        }
    }
}
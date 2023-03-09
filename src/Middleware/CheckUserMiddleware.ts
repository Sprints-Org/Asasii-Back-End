import {IMiddleware} from "../Interface";
import {NextFunction, Request, Response} from "express";
import {UserService} from "../Service";
import {IRequest} from "../Interface";

export class CheckUserMiddleware implements IMiddleware {
    public admin: boolean;

    constructor(admin: boolean) {
        this.admin = admin;

    }

    async checkUser(req: IRequest, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        } else {
            const header = req.headers;
            const user = await new UserService().getUser(header.authorization!.split(" ")[1]);
            const isAdmin = user?.admin;
            if (user == null) {
                return res.status(400).json({
                    msg: "Invalid token"
                });
            } else if (this.admin) {
                if (this.admin == isAdmin) {
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
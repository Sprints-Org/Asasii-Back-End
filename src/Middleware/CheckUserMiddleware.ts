import {IMiddleware} from "../Interface";
import {NextFunction, Request, Response} from "express";
import {AuthService} from "../Service/AuthService";

export class CheckUserMiddleware implements IMiddleware {
    public admin: boolean;

    constructor(admin: boolean) {
        this.admin = admin;

    }

    async checkUser(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            return res.status(400).json({
                msg: "Invaled token"
            });
        } else {
            const user = await new AuthService().getUser(req.headers.authorization.split(" ")[1]);
            if (user == null) {
                return res.status(400).json({
                    msg: "Invaled token"
                });
            } else if (this.admin) {
                if (this.admin == user?.admin) {
                    // @ts-ignore
                    req.user = user;
                    next();
                } else {
                    return res.status(400).json({
                        msg: "not admin"
                    });
                }
            } else {
                // @ts-ignore
                req.user = user;
                next();
            }
        }
    }

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (!req.headers.authorization) {
                return res.status(400).json({
                    msg: "Invaled token"
                });
            } else {
                const user = await new AuthService().getUser(req.headers.authorization.split(" ")[1]);
                if (user == null) {
                    return res.status(400).json({
                        msg: "Invaled token"
                    });
                } else if (this.admin) {
                    if (this.admin == user?.admin) {
                        // @ts-ignore
                        req.user = user;
                        next();
                    } else {
                        return res.status(400).json({
                            msg: "not admin"
                        });
                    }
                } else {
                    // @ts-ignore
                    req.user = user;
                    next();
                }
            }
        };
    }
}
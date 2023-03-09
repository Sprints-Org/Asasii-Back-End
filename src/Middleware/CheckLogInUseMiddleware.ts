import {IMiddleware, IUser} from "../Interface";
import {NextFunction, Request, Response} from "express";
import {AuthService} from "../Service/AuthService";
import {UserModel} from "../Model";
import {UserService} from "../Service";
import {IRequest} from "../Interface/IRequest";

export class CheckLogInUseMiddleware implements IMiddleware {

    async checkUser(req: IRequest, res: Response, next: NextFunction) {
        const {id} = req.params;
        req.params
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
            } else if (user._id.toHexString() === id) {
                req.user = user;
                next();
            } else {
                return res.status(400).json({
                    msg: "m3lsh"
                });
            }
        }
    }

    inject(): (req: IRequest, res: Response, next: NextFunction) => void {
        return (req: IRequest, res: Response, next: NextFunction) => {
            return this.checkUser(req, res, next);
        }
    }
}
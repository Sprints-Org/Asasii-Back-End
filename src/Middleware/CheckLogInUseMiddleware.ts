import {IMiddleware, IUser} from "../Interface";
import {NextFunction, Response} from "express";
import {UserService} from "../Service";
import {IRequest} from "../Interface";

export class CheckLogInUseMiddleware implements IMiddleware {

    async checkUser(req: IRequest, res: Response, next: NextFunction) {
        const {id} = req.params;
        req.params
        if (!req.headers.authorization) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        } else {
            const token = req.headers;
            const user:IUser | null = await new UserService().getUser(token.authorization!.split(" ")[1]);
            const _id = user?._id;
            if (user == null) {
                return res.status(400).json({
                    msg: "Invalid token"
                });
            } else if (_id?.toHexString() === id) {
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
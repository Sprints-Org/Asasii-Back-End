import {Request, Response} from "express";
import {IUser} from "../Interface";
import {ObjectId} from "mongodb";
import {AuthService} from "../Service/AuthService";

export class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        const user: IUser = {
            _id: new ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password1,
            admin: false,
        }
        const data = await new AuthService().registerUser(user);
        return res.json(data);
    }

    async logIn(req: Request, res: Response): Promise<Response> {
        const data = await new AuthService().loginUser(req.body.email, req.body.password);
        if (data == null) {
            res.status(400);
            return res.json({"msg": "check your login data"});
        }
        return res.json(data);
    }
}

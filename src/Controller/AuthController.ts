import {Request, Response} from "express";
import {UserModel} from "../Model";
import {IUser} from "../Interface";
import {validationResult} from "express-validator";

export class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        return res.sendStatus(200);
    }
}

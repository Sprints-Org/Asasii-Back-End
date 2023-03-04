import {Request, Response} from "express";
import {UserModel} from "../Model";
import {IUser} from "../Interface";
import {validationResult} from "express-validator";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";

export class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const encryptedPassword: string = await bcrypt.hash(req.body.password1, 10);
        const user:IUser = {
            _id: new ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword,
            admin: false,
        }

        return res.json({
            token: await new UserModel().createUser(user)
        });
    }
}

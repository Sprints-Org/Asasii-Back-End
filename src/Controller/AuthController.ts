import {Request, Response} from "express";
import {UserModel} from "../Model";
import {IUser} from "../Interface";
import {validationResult} from "express-validator";
import {Db} from "mongodb";
import {MongoDB} from "../Database/MongoDB";

export class AuthController {
    // private db?:Db;
    // async connectDB(): Promise<Db> {
    //     return await new MongoDB().client();
    // }
    async register(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // this.db = await this.connectDB();
        // return await this.db!.collection('users').findOne({username: username});
        return res.sendStatus(200);
    }
}

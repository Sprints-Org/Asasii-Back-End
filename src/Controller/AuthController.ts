import {Request, Response} from "express";

export class AuthController {
    register(req: Request, res: Response): Response {
        return res.sendStatus(200);
    }
}

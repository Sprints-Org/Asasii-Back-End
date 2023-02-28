import {NextFunction, Request, Response} from "express";

export interface IMiddleware {
    inject(): (req: Request, res: Response, next: NextFunction) => void;
}
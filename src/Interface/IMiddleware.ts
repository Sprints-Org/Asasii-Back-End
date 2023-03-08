import {NextFunction, Response} from "express";
import {IRequest} from "./IRequest";

export interface IMiddleware {
    inject(): (req: IRequest, res: Response, next: NextFunction) => void;
}
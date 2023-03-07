import {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";
import {body, Meta, validationResult} from "express-validator";
import {ValidationService} from "../Service/ValidationService";
import { File } from "buffer";


export class ValidateCategory implements IMiddleware {

    async CreateCategoryMiddleWare(req: Request, res: Response, next: NextFunction) {
       
        return next();
    };

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return this.CreateCategoryMiddleWare;
    }

}
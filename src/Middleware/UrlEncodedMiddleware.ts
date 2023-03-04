import express, {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";


export class UrlEncodedMiddleware implements IMiddleware {

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return express.urlencoded({extended: false});
    }
}
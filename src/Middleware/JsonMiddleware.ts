import express, {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";


export class JsonMiddleware implements IMiddleware {

    jsonMiddleWare() {
        return express.json();
    };

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return this.jsonMiddleWare;
    }
}
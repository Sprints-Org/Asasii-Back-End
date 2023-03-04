import express, {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";


export class TextMiddleware implements IMiddleware {

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return express.text();
    }
}
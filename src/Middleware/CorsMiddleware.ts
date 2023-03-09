import express, {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";
import cors from "cors";

export class CorsMiddleware implements IMiddleware {

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return cors();
    }
}
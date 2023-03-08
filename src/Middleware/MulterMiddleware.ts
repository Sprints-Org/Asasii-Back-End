import {IMiddleware} from "../Interface";
import {NextFunction, Request, Response} from "express";
import multer from "multer";
import randomBytes from "randombytes";

export class MulterMiddleware implements IMiddleware {
    public location;

    constructor(location: string) {
        this.location = location;
    }

    multerMiddleware(): multer.StorageEngine {
        return multer.diskStorage({
            destination: `public/images/${this.location}`,
            filename: async function (req, file, cb) {
                const extension: string[] = file.originalname.split('.');
                cb(null, randomBytes(64).readBigUint64BE() + "." + extension[extension.length - 1]);
            }
        });
    }

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return multer({storage: this.multerMiddleware()}).any();
    }
}
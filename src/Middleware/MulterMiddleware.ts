import {IMiddleware} from "../Interface";
import {NextFunction, Response} from "express";
import multer from "multer";
import randomBytes from "randombytes";
import {IRequest} from "../Interface";

export class MulterMiddleware implements IMiddleware {
    public location;

    constructor(location: string) {
        this.location = location;
    }

    multerMiddleware(): multer.StorageEngine {
        return multer.diskStorage({
            destination: `public/images/${this.location}`,
            filename: async function (req: IRequest, file, cb) {
                const extension: string[] = file.originalname.split('.');
                const name = randomBytes(64).readBigUint64BE() + "." + extension[extension.length - 1];
                req.filename = name;
                cb(null, name);
            }
        });
    }

    inject(): (req: IRequest, res: Response, next: NextFunction) => void {
        return multer({storage: this.multerMiddleware()}).any();
    }
}
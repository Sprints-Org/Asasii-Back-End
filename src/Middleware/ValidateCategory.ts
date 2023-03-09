import {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";
import {body, validationResult} from "express-validator";


export class ValidateCategory implements IMiddleware {

    CreateCategoryMiddleWare(req: Request, res: Response, next: NextFunction) {
        body('name', 'name should be string').isString();
        body('image', 'add image to description the category').exists();
        // check('name').isString().withMessage('name should be of type script');
        // check('image').exists().withMessage('add image to description the category');

        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});

        }

        return next();
    };

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return this.CreateCategoryMiddleWare;
    }

}
import {Request, Response, NextFunction} from "express";
import {IMiddleware} from "../Interface";
import {body, Meta, validationResult} from "express-validator";
import {UserModel} from "../Model";
import {ValidationService} from "../Service/ValidationService";


export class RegisterMiddleware implements IMiddleware {

    async authMiddleWare(req: Request, res: Response, next: NextFunction) {
        await body('email', 'Enter your e-mail').exists().bail().isEmail().withMessage('Check your e-mail').bail().run(req);
        await body('email').custom((value: any) => new RegisterMiddleware().emailCheck(value)).run(req);
        await body('firstName', 'Enter your first name').exists().run(req);
        await body('lastName', 'Enter your last name').exists().run(req);
        await body('password1', 'Enter your password').exists().run(req);
        await body('password2', 'Password does not match').exists().run(req);
        await body('password2').custom((value: any, req: Meta) => new RegisterMiddleware().passwordCheck(value, req)).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        return next();
    };

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return this.authMiddleWare;
    }

    passwordCheck(value: any, req: Meta): boolean {
        if (value != req.req.body.password1) {
            throw new Error("Password does not match");
        }
        return true;

    }

    async emailCheck(value: any): Promise<boolean> {
        const userExist: boolean = await new ValidationService().checkUser(value);
        if (userExist) {
            throw new Error("E-mail already used before");
        }
        return true;
    }
}
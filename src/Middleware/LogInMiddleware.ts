import {IMiddleware} from "../Interface";
import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {ValidationService} from "../Service";

export class LogInMiddleware implements IMiddleware {
    async authMiddleWare(req: Request, res: Response, next: NextFunction) {
        await body('email', 'Enter your e-mail').exists().bail().isEmail().withMessage('Check your e-mail').bail().run(req);
        await body('email').custom((value: any) => new LogInMiddleware().emailCheck(value)).run(req);
        await body('password', 'Enter your password').exists().run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        return next();
    };

    inject(): (req: Request, res: Response, next: NextFunction) => void {
        return this.authMiddleWare;
    }

    async emailCheck(value: any): Promise<boolean> {
        const userExist: boolean = await new ValidationService().checkUser(value);
        if (!userExist) {
            throw new Error("Check login information");
        }
        return true;
    }
}
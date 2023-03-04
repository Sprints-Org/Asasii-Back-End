import {IValidator} from "../Interface";
import {body, Meta, ValidationChain} from "express-validator";
import {UserModel} from "../Model";
import {request} from "express";


export class RegisterValidation implements IValidator {


    inject(): ValidationChain[] {
        return [body('email', 'Enter your e-mail').exists().isEmail().withMessage('Check your e-mail').bail(),
            body('email').custom((value: any) => this.emailCheck(value)),
            body('firstName', 'Enter your first name').exists(),
            body('lastName', 'Enter your last name').exists(),
            body('password1', 'Enter your password').exists(),
            body('password2', 'Password does not match').exists(),
            body('password1').custom((value: any, req: Meta) => this.passwordCheck(value, req))];
    }

    passwordCheck(value: any, req: Meta): boolean {
        if( value != req.req.body.password2) {
            throw new Error("Password does not match");
        }
        return true;

    }

    async emailCheck(value: any): Promise<boolean> {
        const userExist = await new UserModel().checkEmail(value);
        if( userExist != null) {
            throw new Error("E-mail already used before");
        }
        return true;

    }
}
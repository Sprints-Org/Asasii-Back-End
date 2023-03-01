import {IUser, IValidator} from "../Interface";
import {body, Meta, ValidationChain} from "express-validator";
import {UserModel} from "../Model";
import {WithId} from "mongodb";


export class RegisterValidation implements IValidator {

    private userExist?: WithId<IUser> | null;

    inject(): ValidationChain[] {

        return [body('email', 'Check your e-mail').isEmail(),
            body('email', 'Enter your e-mail').exists(),
            body('email', 'E-mail already used before').custom((value: any) => this.emailCheck(value)),
            body('firstName', 'Enter your first name').exists(),
            body('lastName', 'Enter your last name').exists(),
            body('password1', 'Enter your password').exists(),
            body('password2', 'Password does not match').exists(),
            body('password1', 'Password does not match').custom((value: any, req: Meta) => this.passwordCheck(value, req))];
    }

    passwordCheck(value: any, req: Meta): boolean {
        if (value !== req.req.body.password1) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }

    async emailCheck(value: any): Promise<boolean> {
        this.userExist = await new UserModel().checkEmail(value);
        if (this.userExist != null) {
            throw new Error('E-mail already used before');
        }
        return true;
    }
}
import {ValidationChain} from "express-validator";

export interface IValidator {
    inject(): ValidationChain[];
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCategory = void 0;
const express_validator_1 = require("express-validator");
class ValidateCategory {
    CreateCategoryMiddleWare(req, res, next) {
        (0, express_validator_1.body)('name', 'name should be string').isString();
        (0, express_validator_1.body)('image', 'add image to descripe the category').exists();
        // check('name').isString().withMessage('name should be of type script');
        // check('image').exists().withMessage('add image to descripe the category');
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    }
    ;
    inject() {
        return this.CreateCategoryMiddleWare;
    }
}
exports.ValidateCategory = ValidateCategory;

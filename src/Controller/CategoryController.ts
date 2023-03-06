import {Request, Response} from "express";
import { Application } from "express-serve-static-core";
import {validationResult} from "express-validator";
import {ObjectId} from "mongodb";
import multer, { diskStorage } from "multer";
import { ICategory } from "../Interface";
import { CategoryService } from "../Service/CategoryService";


export class CategoryController {
    
    async add (req: Request, res: Response): Promise<Response> {
        const Category: ICategory = {
            _id: new ObjectId(),
            name: req.body.name,
            image: req.file?.path,
        }
        const data = await new CategoryService().createCategory(Category);
        return res.json(data);
    }

}

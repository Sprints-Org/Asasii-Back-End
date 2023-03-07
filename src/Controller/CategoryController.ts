import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {ObjectId} from "mongodb";
import { ICategory } from "../Interface";
import { CategoryService } from "../Service/CategoryService";


export class CategoryController {
    async add (req: Request, res: Response): Promise<Response> {
        const Category: ICategory = {
            _id: new ObjectId(),
            name: req.body.name,
            image: req.body.img,
        }
        const data = await new CategoryService().createCategory(Category);
        return res.json(data);
    }

}

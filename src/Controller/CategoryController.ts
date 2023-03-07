import {Request, Response} from "express";
import {Application} from "express-serve-static-core";
import {param, sanitize, validationResult} from "express-validator";
import {ObjectId} from "mongodb";
import multer, {diskStorage} from "multer";
import {ICategory} from "../Interface";
import {Category} from "../Routes/API";
import {CategoryService} from "../Service/CategoryService";


export class CategoryController {

    /*async add (req: Request, res: Response): Promise<Response> {
        const Category: ICategory = {
            _id: new ObjectId(),
            name: req.body.name,
            image: req.file?.path,
        }
        const data = await new CategoryService().createCategory(Category);
        return res.json(data);
    }*/

    async add(req: Request, res: Response): Promise<Response> {
        const files: any = req.files;
        const file: any = files[0];
        console.log(file.filename);
        const Category: ICategory = {
            _id: new ObjectId(),
            name: req.body.name,
            image: file.filename,
        }
        const data = await new CategoryService().createCategory(Category);


        return res.json(data);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const data = await new CategoryService().getAllCategory();
        return res.json(data);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const data = await new CategoryService().getCategoryById(new ObjectId(id));
        console.log(data[0].image);
        return res.json(data);
    }

    async getCategoryProducts(req: Request, res: Response): Promise<Response> {
        const {Category_name} = req.params;
        const data = await new CategoryService().getCategoryProducts(Category_name);
        return res.json(data);
    }

}

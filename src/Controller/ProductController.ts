import { Console } from "console";
import {Request, Response} from "express";
import { Application } from "express-serve-static-core";
import {param, validationResult} from "express-validator";
import {ObjectId} from "mongodb";
import multer, { diskStorage } from "multer";
import { IProduct } from "../Interface";
import { Product } from "../Routes/API";
import { ProductService } from "../Service/ProductService";


export class ProductController {

    async add (req: Request, res: Response): Promise<Response> {
        const Product: IProduct = {
            _id: new ObjectId(),
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            quantity:req.body.quantity,
            colors:req.body.colors,
            description: req.body.description,
            additional_info: req.body.additional_info,
            category_name: req.body.category_name,
            }  
            
        const data = await new ProductService().createProduct(Product);
        return res.json(data);
    }

    async getAll(req:Request,res:Response): Promise<Response>{
        const data = await new ProductService().getAllProduct();
        
        return res.json(data);
    }

    async getById(req:Request,res:Response): Promise<Response>{
        const {id} = req.params;
        const data = await new ProductService().getProductById(new ObjectId(id));
        console.log(data);
        return res.json(data);
    }

    async getBySearch(req:Request,res:Response): Promise<Response>{
        const {key} = req.params; 
        const data = await new ProductService().getProductbysearch(key);
        return res.json(data);
    }

}

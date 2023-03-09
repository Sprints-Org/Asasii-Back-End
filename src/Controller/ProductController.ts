import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {IProduct} from "../Interface";
import {ProductService} from "../Service";
import {IRequest} from "../Interface";


export class ProductController {

    async add(req: IRequest, res: Response): Promise<Response> {
        const Product: IProduct = {
            _id: new ObjectId(),
            name: req.body.name,
            image: req.filename!,
            price: req.body.price,
            quantity: req.body.quantity,
            colors: req.body.colors,
            description: req.body.description,
            additional_info: req.body.additional_info,
            category_name: req.body.category_name,
        }

        const data = await new ProductService().createProduct(Product);
        return res.json(data);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const data = await new ProductService().getAllProduct();
        return res.json(data);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const data = await new ProductService().getProductById(new ObjectId(id));
        return res.json(data);
    }

    async getBySearch(req: Request, res: Response): Promise<Response> {
        const {key} = req.params;
        const data = await new ProductService().getProductBySearch(key);
        return res.json(data);
    }

    async edit(req: IRequest, res: Response): Promise<Response> {
        //check if all filed is exists
        if (!req.body.name || !req.files) {
            return res.status(400).json({
                error: "missing requirements"
            })
        }
        const {id} = req.params;
        // //get the new path for the image
        // const files: any = req.files;
        // const file: any = files[0];
        const Product: IProduct = {
            _id: new ObjectId(id),
            name: req.body.name,
            image: req.filename!,
            price: req.body.price,
            quantity: req.body.quantity,
            colors: req.body.colors,
            description: req.body.description,
            additional_info: req.body.additional_info,
            category_name: req.body.category_name,
        }
        const data = await new ProductService().editProduct(new ObjectId(id), Product);


        return res.json(data);
    }


    async delete(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const data = await new ProductService().deleteProduct(new ObjectId(id));
        return res.json(data);
    }


}

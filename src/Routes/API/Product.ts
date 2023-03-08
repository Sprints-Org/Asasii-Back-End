import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import { ProductController } from "../../Controller/ProductController";
import multer, { Multer } from "multer";
import {MulterMiddleware} from "../../Middleware/MulterMiddleware";

export class Product extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.post('/', new MulterMiddleware('product').inject(),new ProductController().add);
        this.subApp.get('/',new ProductController().getAll);
        this.subApp.get('/:id',new ProductController().getById);
        this.subApp.get('/search/:key',new ProductController().getBySearch);
        this.subApp.put('/:id',new MulterMiddleware('product').inject(),new ProductController().edit)
        this.subApp.delete('/:id',new ProductController().delete)
        


    }
    routePath(): string {
        return (super.routePath() + "/product");
    }

    getApp(): Application {
        return super.getApp();
    }
}


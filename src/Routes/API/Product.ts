import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {ProductController} from "../../Controller";
import {CheckUserMiddleware, MulterMiddleware} from "../../Middleware";

export class Product extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.get('/', new ProductController().getAll);
        this.subApp.get('/:id', new ProductController().getById);
        this.subApp.get('/search/:key', new ProductController().getBySearch);
        //admin only can call those apis 
        this.subApp.post('/',new CheckUserMiddleware(true).inject(), new MulterMiddleware('product').inject(), new ProductController().add);
        this.subApp.put('/:id', new CheckUserMiddleware(true).inject(),new MulterMiddleware('product').inject(), new ProductController().edit)
        this.subApp.delete('/:id', new CheckUserMiddleware(true).inject(),new ProductController().delete)
    }

    routePath(): string {
        return (super.routePath() + "/product");
    }

    getApp(): Application {
        return super.getApp();
    }
}


import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {CategoryController} from "../../Controller";
import {CheckUserMiddleware, MulterMiddleware} from "../../Middleware";
import { param } from "express-validator";

export class Category extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.get('/', new CategoryController().getAll);
        this.subApp.get('/:id',new CategoryController().getById);
        this.subApp.get('/:Category_name/products', new CategoryController().getCategoryProducts);
       //admin only can call those apis 
        this.subApp.post('/', new CheckUserMiddleware(true).inject(), new MulterMiddleware('category').inject(), new CategoryController().add);
        this.subApp.put('/:id', new CheckUserMiddleware(true).inject(),new MulterMiddleware('category').inject(), new CategoryController().edit)
        this.subApp.delete('/:id', new CheckUserMiddleware(true).inject(),new CategoryController().delete)
    }

    routePath(): string {
        return (super.routePath() + "/category");
    }

    getApp(): Application {
        return super.getApp();
    }
}


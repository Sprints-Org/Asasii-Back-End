import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import express, {Application} from "express";
import {CategoryController} from "../../Controller";
import multer, {Multer} from "multer";
import randomBytes from "randombytes";
import {MulterMiddleware} from "../../Middleware/MulterMiddleware";


export class Category extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.post('/add', new MulterMiddleware('category').inject(), new CategoryController().add);
        this.subApp.post('/', new CategoryController().add);
        this.subApp.get('/', new CategoryController().getAll);
        this.subApp.get('/:id', new CategoryController().getById);
        this.subApp.get('/:Category_name/products', new CategoryController().getCategoryProducts);


    }

    routePath(): string {
        return (super.routePath() + "/category");
    }

    getApp(): Application {
        return super.getApp();
    }
}


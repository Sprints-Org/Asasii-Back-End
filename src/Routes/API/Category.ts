import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import {CategoryController} from "../../Controller";
import {MulterMiddleware} from "../../Middleware/MulterMiddleware";
import {ValidateCategory} from "../../Middleware/ValidateCategory";


export class Category extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        this.subApp.post('/', new ValidateCategory().inject(), new MulterMiddleware('category').inject(), new CategoryController().add);
        this.subApp.get('/', new CategoryController().getAll);
        this.subApp.get('/:id', new CategoryController().getById);
        this.subApp.get('/:Category_name/products', new CategoryController().getCategoryProducts);
        this.subApp.put('/:id', new MulterMiddleware('category').inject(), new CategoryController().edit)
        this.subApp.delete('/:id', new CategoryController().delete)

    }

    routePath(): string {
        return (super.routePath() + "/category");
    }

    getApp(): Application {
        return super.getApp();
    }
}


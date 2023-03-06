import {BaseRouter} from "../BaseRouter";
import {IRoute} from "../../Interface";
import {Application} from "express";
import { CategoryController } from "../../Controller/CategoryController";
import multer, { Multer } from "multer";

export class Category extends BaseRouter implements IRoute {
    async inject(): Promise<void> {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'public/files/categories')
            },
            filename: function (req, file, cb) {       
                cb(null,Date.now() + file.originalname )
            }
          }) 
        const UploadeImage=  multer({storage:storage}); 
       
        this.subApp.post('/', UploadeImage.single("image"),new CategoryController().add);
        this.subApp.get('/',new CategoryController().add);


    }
    routePath(): string {
        return (super.routePath() + "/category");
    }

    getApp(): Application {
        return super.getApp();
    }
}


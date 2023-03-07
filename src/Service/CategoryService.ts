import {ICategory} from "../Interface";
import {ObjectId, WithId} from "mongodb";
import {CategoryModel} from "../Model";


export class CategoryService {
   
    async createCategory(category: ICategory){
         const newCategoryId: ObjectId = await new CategoryModel().createCategory(category);
        return newCategoryId ;
    }
}
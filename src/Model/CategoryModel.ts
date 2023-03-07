import {MongoDB} from "../Database/MongoDB";
import {Collection, ObjectId, WithId} from "mongodb";
import { ICategory } from "../Interface";

export class CategoryModel {

private collectionName: string = 'category';

    async createCategory(category: ICategory ): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        const newCategory = await collection.insertOne(category);
        return newCategory.insertedId;
    }

    async getAllCategory(): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        const categories = await collection.find().toArray();
        return categories;
    }

    async getCategoryById(categoryId:ObjectId): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        const category = await collection.find({_id : categoryId}).toArray();
        return category;
    }
    async getCategoryProducts(Category_name:string): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>('products');
        const category = await collection.find({category_name: Category_name}).toArray();
        return category;
    }

}
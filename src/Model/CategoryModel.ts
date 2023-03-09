import {MongoDB} from "../Database/MongoDB";
import {Collection, ObjectId} from "mongodb";
import {ICategory} from "../Interface";

export class CategoryModel {

    private collectionName: string = 'category';

    async createCategory(category: ICategory): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        const newCategory = await collection.insertOne(category);
        return newCategory.insertedId;
    }

    async getAllCategory(): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        return await collection.find().toArray();
    }

    async getCategoryById(categoryId: ObjectId): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        return await collection.find({_id: categoryId}).toArray();
    }

    async getCategoryProducts(Category_name: string): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>('products');
        return await collection.find({category_name: Category_name}).toArray();
    }

    async editCategory(id: ObjectId, category: ICategory): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        const newCategory = await collection.updateMany({_id: id}, {$set: category});
        return newCategory.upsertedId;
    }

    async deleteCategory(CategoryId: ObjectId): Promise<any> {
        const collection: Collection = await new MongoDB().client<ICategory>(this.collectionName);
        return await collection.deleteOne({_id: CategoryId});
    }

}
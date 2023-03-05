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
}
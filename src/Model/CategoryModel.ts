import {MongoDB} from "../Database/MongoDB";
import {Collection, ObjectId} from "mongodb";
import {ICategory, IDb} from "../Interface";

export class CategoryModel implements IDb {

    private collectionName: string = 'category';
    public connect: MongoDB = new MongoDB();
    async createCategory(category: ICategory): Promise<ObjectId> {
        const collection: Collection = await this.connect.client<ICategory>(this.collectionName);
        const newCategory = await collection.insertOne(category).finally(this.connect.closeConnection());
        return newCategory.insertedId;
    }

    async getAllCategory(): Promise<any> {
        const collection: Collection = await this.connect.client<ICategory>(this.collectionName);
        return await collection.find().toArray().finally(this.connect.closeConnection());
    }

    async getCategoryById(categoryId: ObjectId): Promise<any> {
        const collection: Collection = await this.connect.client<ICategory>(this.collectionName);
        return await collection.find({_id: categoryId}).toArray().finally(this.connect.closeConnection());
    }

    async getCategoryProducts(Category_name: string): Promise<any> {
        const collection: Collection = await this.connect.client<ICategory>('products');
        return await collection.find({category_name: Category_name}).toArray().finally(this.connect.closeConnection());
    }

    async editCategory(id: ObjectId, category: ICategory): Promise<any> {
        const collection: Collection = await this.connect.client<ICategory>(this.collectionName);
        const newCategory = await collection.updateMany({_id: id}, {$set: category}).finally(this.connect.closeConnection());
        return newCategory.upsertedId;
    }

    async deleteCategory(CategoryId: ObjectId): Promise<any> {
        const collection: Collection = await this.connect.client<ICategory>(this.collectionName);
        return await collection.deleteOne({_id: CategoryId}).finally(this.connect.closeConnection());
    }

}
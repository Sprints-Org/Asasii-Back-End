import {MongoDB} from "../Database/MongoDB";
import {Collection, ObjectId} from "mongodb";
import {IProduct} from "../Interface";

export class ProductModel {

    private collectionName: string = 'products';

    async createProduct(Product: IProduct): Promise<ObjectId> {
        const collection: Collection = await new MongoDB().client<IProduct>(this.collectionName);
        const newProduct = await collection.insertOne(Product);
        return newProduct.insertedId;
    }

    async getAllProduct(): Promise<any> {
        const collection: Collection = await new MongoDB().client<IProduct>(this.collectionName);
        const products = await collection.find().toArray();
        return products;
    }

    async getProductById(ProductId: ObjectId): Promise<any> {
        const collection: Collection = await new MongoDB().client<IProduct>(this.collectionName);
        const Product = await collection.find({_id: ProductId}).toArray();
        console.log(Product)
        return Product;
    }

    async getProductbysearch(key: string): Promise<any> {
        const collection: Collection = await new MongoDB().client<IProduct>(this.collectionName);
        const Product = await collection.find({name: {$regex: key, $options: 'i'}}).toArray();
        return Product;
    }

    async editProduct(id: ObjectId, Product: IProduct): Promise<any> {
        const collection: Collection = await new MongoDB().client<IProduct>(this.collectionName);
        const newProduct = await collection.updateMany({_id: id}, {$set: Product});
        return newProduct.upsertedId;
    }

    async deleteProduct(ProductId: ObjectId): Promise<any> {
        const collection: Collection = await new MongoDB().client<IProduct>(this.collectionName);
        const deleted = await collection.deleteOne({_id: ProductId});
        return deleted;
    }


}
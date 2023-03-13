import {MongoDB} from "../Database";
import {Collection, ObjectId} from "mongodb";
import {IDb, IProduct} from "../Interface";

export class ProductModel implements IDb{

    private collectionName: string = 'products';
    public connect: MongoDB = new MongoDB();
    async createProduct(Product: IProduct): Promise<ObjectId> {
        const collection: Collection = await this.connect.client<IProduct>(this.collectionName);
        const newProduct = await collection.insertOne(Product).finally(this.connect.closeConnection());
        return newProduct.insertedId;
    }

    async getAllProduct(): Promise<any> {
        const collection: Collection = await this.connect.client<IProduct>(this.collectionName);
        return await collection.find().toArray().finally(this.connect.closeConnection());
    }

    async getProductById(ProductId: ObjectId): Promise<any> {
        const collection: Collection = await this.connect.client<IProduct>(this.collectionName);
        const Product = await collection.find({_id: ProductId}).toArray().finally(this.connect.closeConnection());
        console.log(Product)
        return Product;
    }

    async getProductBySearch(key: string): Promise<any> {
        const collection: Collection = await this.connect.client<IProduct>(this.collectionName);
        return await collection.find({name: {$regex: key, $options: 'i'}}).toArray().finally(this.connect.closeConnection());
    }

    async editProduct(id: ObjectId, Product: IProduct): Promise<any> {
        const collection: Collection = await this.connect.client<IProduct>(this.collectionName);
        const newProduct = await collection.updateMany({_id: id}, {$set: Product}).finally(this.connect.closeConnection());
        return newProduct.upsertedId;
    }

    async deleteProduct(ProductId: ObjectId): Promise<any> {
        const collection: Collection = await this.connect.client<IProduct>(this.collectionName);
        return await collection.deleteOne({_id: ProductId}).finally(this.connect.closeConnection());
    }

}
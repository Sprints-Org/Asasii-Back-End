import {IProduct} from "../Interface";
import {ObjectId} from "mongodb";
import {ProductModel} from "../Model";

export class ProductService {

    async createProduct(Product: IProduct) {

        const newProductId: ObjectId = await new ProductModel().createProduct(Product);
        return newProductId.toHexString();
    }

    async getAllProduct() {
        const products: IProduct[] = await new ProductModel().getAllProduct();
        return products;
    }

    async getProductById(ProductId: ObjectId) {
        const Product: IProduct = await new ProductModel().getProductById(ProductId);
        return Product;
    }

    async getProductBySearch(key: string) {
        const Product: IProduct = await new ProductModel().getProductBySearch(key);
        return Product;
    }

    async editProduct(id: ObjectId, updatedProduct: IProduct) {
        const Product: IProduct = await new ProductModel().editProduct(id, updatedProduct);
        return Product;
    }

    async deleteProduct(ProductId: ObjectId) {
        const Product: IProduct = await new ProductModel().deleteProduct(ProductId);
        return Product;
    }
}
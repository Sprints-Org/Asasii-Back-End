import {IProduct} from "../Interface";
import {ObjectId, WithId} from "mongodb";
import {ProductModel} from "../Model";


export class ProductService {
   
    async createProduct(Product: IProduct){
         const newProductId: ObjectId = await new ProductModel().createProduct(Product);
        return newProductId.toHexString() ;
    }
    async getAllProduct(){
        const products: IProduct[] = await new ProductModel().getAllProduct();
       return  products;
   }
   async getProductById(ProductId:ObjectId){
    const Product: IProduct = await new ProductModel().getProductById(ProductId);
   return  Product;
   }
   async getProductbysearch(key:string){
    const Product: IProduct = await new ProductModel().getProductbysearch(key);
   return  Product;
   }

}
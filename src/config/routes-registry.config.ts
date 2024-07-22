import { Express } from "express-serve-static-core";
import { ProductController } from "../controllers/product-controller";

export class RoutesRegistryConfig{
    
    private productController: ProductController

    constructor(private readonly app: Express){
        this.productController = new ProductController()
    }


    register(){
        this.app.get("/api/products", this.productController.getProducts)
    }
}

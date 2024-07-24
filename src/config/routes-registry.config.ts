import { Express } from "express-serve-static-core";
import productRouter from '../routes/product.router'

export class RoutesRegistryConfig{
    
    constructor(private readonly app: Express){}
    
    register(){
        this.app.use('/api/products', productRouter)
    }
}

import { Express } from "express-serve-static-core";
import productRouter from '../routes/product.router'
import customerRouter from '../routes/customer.routes'

export class RoutesRegistryConfig{
    
    constructor(private readonly app: Express){}
    
    register(){
        this.app.use('/api/products', productRouter)
        this.app.use('/api/customers', customerRouter)
    }
}

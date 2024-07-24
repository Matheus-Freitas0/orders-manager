import { DatasourceConfig } from "../config/datasource.config";
import { Product } from "../models/product";


export class ProductRepository{
    constructor(private datasourceConfig: DatasourceConfig){}
    
    async getProducts(): Promise<Product[]> {
        const conn = await this.datasourceConfig.connection.getConnection()
        const data = await conn.query('SELECT * FROM products')
        const resultSet = data[0]
        return resultSet as Product[]
        }
         
    }
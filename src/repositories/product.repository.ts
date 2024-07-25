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
    
    async getProductByCode(code:string): Promise<Product>{
        const conn = await this.datasourceConfig.connection.getConnection()
        const data = await conn.query('SELECT * FROM products WHERE code = ?', [code])
        const resultSet = data[0] as Product[]
        return resultSet[0] as Product
    }    
    
    async activateOrDeactivateProduct(code:string, value:boolean):Promise<void>{
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }
        
        const conn = await this.datasourceConfig.connection.getConnection()
        const stmt = 'UPDATE products SET active = ? WHERE code = ?'
        await conn.query(stmt, [value, code])
    }

    async createProduct(product:Product): Promise<void>{
        const conn = await this.datasourceConfig.connection.getConnection()
        const stmt = 'INSERT INTO products (code, name, value, stock, active) VALUES(?,?,?,?,?)'
        await conn.query(stmt, [product.code, product.name, product.value, product.stock, product.active])
    }

    async updateProduct (code: string, body: any): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }

        const conn = await this.datasourceConfig.connection.getConnection()
        const stmt = 'UPDATE products SET name = ?, value = ?, stock = ? WHERE code = ?'
        await conn.query(stmt, [body.name, body.value, body.stock, code])
    }
    
    async deleteProduct (code:string): Promise<void>{
        const product = await this.getProductByCode(code)

        if(!product){
            throw new Error(`product with code: ${code} not found`)
        }
        const conn = await this.datasourceConfig.connection.getConnection()
        const stmt = 'DELETE FROM products WHERE code = ?'
        await conn.query(stmt, [code])
    }
}

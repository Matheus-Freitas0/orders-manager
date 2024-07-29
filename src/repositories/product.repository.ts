import { Product } from '../models/product'
import { DatasourceConfig } from '../config/datasource.config'
import queries from '../../files/products-queries.json'


export class ProductRepository {

    constructor(private datasourceConfig: DatasourceConfig) {}

    async getProducts(): Promise<Product[]> {
        const conn = await this.datasourceConfig.connection.getConnection()
        const data = await conn.query(queries.getAll)
        const resultSet = data[0]
        return resultSet as Product[]
    }

    async getProductByCode(code: string): Promise<Product> {
        const conn = await this.datasourceConfig.connection.getConnection()
        const data = await conn.query(queries.getByCode, code)
        const resultSet = data[0] as Product[]
        return resultSet[0] as Product
    }

    async activateOrDeactivateProduct(code: string, value: boolean): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }
        
        const conn = await this.datasourceConfig.connection.getConnection()
        await conn.query(queries.updateActive, [value, code])
    }

    async createProduct(product: Product): Promise<void> {
        const conn = await this.datasourceConfig.connection.getConnection()
        await conn.query(queries.create, [product.code, product.name, product.value, product.stock, product.categoryId, product.active])
    }

    async updateProduct (code: string, body: any): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }

        const conn = await this.datasourceConfig.connection.getConnection()
        const stmt = ''
        await conn.query(queries.update, [body.name, body.value, body.stock, code])
    }

    async deleteProduct(code: string): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }
        
        const conn = await this.datasourceConfig.connection.getConnection()
        await conn.query(queries.delete, [code])
    }

}
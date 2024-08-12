import { Repository } from '../repository';
import { ProductRepository } from './../product.repository';
import queries from '../../../files/queries/products-queries.json'
import { Product } from '../../models/product';
import { randomUUID } from 'crypto';
import { AppUtils } from '../../utils/app.utils';

export class ProductRepositoryImpl extends Repository implements ProductRepository {

    async getProducts(): Promise<Product[]> {
        const products: Product[] = []
        const data = await this.datasource.query(queries.getAll)
        const resultSet = data[0]
    
        for (const productModel of resultSet) {
            products.push({
                id: productModel['id'],
                code: productModel['code'],
                name: productModel['name'],
                value: productModel['value'],
                active: productModel['active'],
                stock: productModel['stock'],
                categoryId: productModel['category_id']
            })
        }

        return products
    }

    async getProductByCode(code: string): Promise<Product | null> {
        const data = await this.datasource.query(queries.getByCode, code)
        const resultSet = data[0]

        if (!resultSet[0]) return null
        
        return {
            id: resultSet[0]['id'],
            code: resultSet[0]['code'],
            name: resultSet[0]['name'],
            value: resultSet[0]['value'],
            active: resultSet[0]['active'],
            stock: resultSet[0]['stock'],
            categoryId: resultSet[0]['category_id']
        }
    }

    async createProduct(product: Product): Promise<void> {
        const uuid: string = AppUtils.genereteUUIDSimples()
        await this.datasource.query(queries.create, uuid, product.name, product.value, product.stock, product.categoryId, product.active)
    }

    async updateProduct (code: string, body: any): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }

        await this.datasource.query(queries.update, body.name, body.value, body.stock, code)
    }

    async deleteProduct(code: string): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }
        
        await this.datasource.query(queries.delete, code)
    }

    async activateOrDeactivateProduct(code: string, value: boolean): Promise<void> {
        const product = await this.getProductByCode(code)

        if (!product) {
            throw new Error(`product with code: ${code} not found`)
        }
    
        await this.datasource.query(queries.updateActive, value, code)
    }
    
    async getProductsByCodeIn(codes: string[]): Promise<Product[]> {
        const products: Product[] = []
        const data = await this.datasource.query(queries.getByCodeIn, codes)
        const resultSet = data[0]
    
        for (const productModel of resultSet) {
            products.push({
                id: productModel['id'],
                code: productModel['code'],
                name: productModel['name'],
                value: productModel['value'],
                active: productModel['active'],
                stock: productModel['stock'],
                categoryId: productModel['category_id']
            })
        }

        return products
    }
    
}
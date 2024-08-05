import { Product } from '../models/product'

export interface ProductRepository {

    getProducts(): Promise<Product[]>
    getProductByCode(code: string): Promise<Product | null>
    createProduct(product: Product): Promise<void>
    updateProduct (code: string, body: any): Promise<void>
    deleteProduct(code: string): Promise<void>
    activateOrDeactivateProduct(code: string, value: boolean): Promise<void>

}
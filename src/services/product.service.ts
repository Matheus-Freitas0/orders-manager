import { ProductRequestDTO } from "../dto/product-request.dto"
import { ProductResponseDTO } from "../dto/product-response.dto"
import { Category } from "../models/category"

export interface ProductService {
    getProducts(): Promise<ProductResponseDTO[]>
    deleteProduct(code: string): Promise<void>
    createProduct(product: ProductRequestDTO): Promise<void>
    getProductByCode(code: string): Promise<ProductResponseDTO | null>
    updateProduct(code: string, product: ProductRequestDTO): Promise<void>
    activateOrDeactivateProduct(code: string, value: boolean): Promise<void>
    getAllCategories(): Promise<Category[]>
}
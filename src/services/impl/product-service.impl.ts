import { Inject } from '../../config/container.config'
import { ProductResponseDTO } from '../../dto/product-response.dto'
import { Category } from '../../models/category'
import { Product } from '../../models/product'
import { CategoryRepository } from '../../repositories/category.repository'
import { ProductRepository } from '../../repositories/product.repository'
import { ProductService } from '../product.service'

export class ProductServiceImpl implements ProductService {

    @Inject('productRepo') repository!: ProductRepository
    @Inject('categoryRepo') categoryRepository!: CategoryRepository 

    async getProducts(): Promise<ProductResponseDTO[]> {
        const products: Product[] = await this.repository.getProducts()
        const productsResponse: ProductResponseDTO[] = []

        for (const product of products) {
            const category: Category = await this.categoryRepository.getById(product.categoryId)
            const productResponse: ProductResponseDTO = {
                id: product.id,
                name: product.name,
                value: product.value,
                stock: product.stock,
                category
            }
            productsResponse.push(productResponse)
        }

        return productsResponse
    }
    
        async getProductByCode(code: string): Promise<ProductResponseDTO | null> {
            const product = await this.repository.getProductByCode(code)
    
            if (!product) return null
    
            const category = await this.categoryRepository.getById(product.categoryId)
            return {
                id: product.id,
                name: product.name,
                value: product.value,
                stock: product.stock,
                category
            }
        }

    async deleteProduct(code: string): Promise<void> {
        await this.repository.deleteProduct(code)
    }

    async createProduct(product: Product): Promise<void> {
        await this.repository.createProduct(product)
    }

    async updateProduct(code: string, product: Product): Promise<void> {
        await this.repository.updateProduct(code, product)
    }

    async activateOrDeactivateProduct(code: string, value: boolean): Promise<void> {
        await this.repository.activateOrDeactivateProduct(code, value)
    }
    
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAll()
    }

    async getProductsByCodeIn(codes: string[]): Promise<ProductResponseDTO[]> {
        const products: Product[] = await this.repository.getProductsByCodeIn(codes)
        const productsResponse: ProductResponseDTO[] = []

        for (const product of products) {
            const category: Category = await this.categoryRepository.getById(product.categoryId)
            const productResponse: ProductResponseDTO = {
                id: product.id,
                name: product.name,
                value: product.value,
                stock: product.stock,
                category
            }
            productsResponse.push(productResponse)
        }

        return productsResponse
    }
}
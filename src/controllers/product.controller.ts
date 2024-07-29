import { Request, Response } from "express";
import { Product } from "../models/product";
import { ProductRepository } from "../repositories/product.repository";
import { DatasourceConfig } from "../config/datasource.config";
import { CategoryRepository } from "../repositories/category.repository";

export class ProductController {
    
    productRepository: ProductRepository
    categoryRepository: CategoryRepository
    
    constructor () {
        const datasource = new DatasourceConfig()
        this.productRepository = new ProductRepository(datasource)
        this.categoryRepository = new CategoryRepository(datasource)

        this.getProducts = this.getProducts.bind(this)
        this.getProductByCode = this.getProductByCode.bind(this)
        this.activeProduct = this.activeProduct.bind(this)
        this.deactivateProduct = this.deactivateProduct.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProductByCode = this.deleteProductByCode.bind(this)
        this.getCategories = this.getCategories.bind(this)
    }
    
    async getProducts(req: Request, res: Response) {
        const products = await this.productRepository.getProducts()
        return res.status(200).json(products)    
    }

    async getProductByCode(req: Request, res: Response) {
        const code = req.params['code']
        const product = await this.productRepository.getProductByCode(code)

        if (!!product)
            return res.status(200).json(product)
        
        return res.status(404).json({ message: 'product not found'})
    }

    async activeProduct(req: Request, res: Response) {
        const code = req.params['code']

        try {
            await this.productRepository.activateOrDeactivateProduct(code, true)
            return res.status(200).json({ message: 'product has been activated'})

        } catch (error: any) {
            return res.status(404).json({ message: error.message })            
        }        
    }

    async deactivateProduct(req: Request, res: Response) {
        const code = req.params['code']

        try {
            await this.productRepository.activateOrDeactivateProduct(code, false)
            return res.status(200).json({ message: 'product has been deactivated'})

        } catch (error: any) {
            return res.status(404).json({ message: error.message })            
        }        
    }

    async createProduct(req: Request, res: Response) {
        try {
            const product = Product.createProduct(req.body)
            await this.productRepository.createProduct(product)
            return res.status(201).json()
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }

    async updateProduct(req: Request, res: Response) {
        const body = req.body
        const code = req.params.code

        try {
            await this.productRepository.updateProduct(code, body)
            return res.status(204).json()
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }

    async deleteProductByCode(req: Request, res: Response) {
        const code = req.params['code']
        try {
            await this.productRepository.deleteProduct(code)
            return res.status(200).json({ message: 'product has been deleted'})

        } catch (error: any) {
            return res.status(400).json({ message: error.message })            
        }        
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories =  await this.categoryRepository.getAll()
            return res.status(200).json(categories)
        
        } catch (error: any) {
            return res.status(500).json({ message: error.message })                        
        }
    }

}

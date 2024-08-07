import { Request, Response } from 'express'
import { Inject } from '../config/container.config'
import { ProductService } from '../services/product.service'
import { ProductResponseDTO } from '../dto/product-response.dto'
import { ProductRequestDTO } from '../dto/product-request.dto'

export class ProductController {
    
    @Inject('productSvc') service!: ProductService
    
    constructor(){
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
        const products:ProductResponseDTO[] = await this.service.getProducts()
        return res.status(200).json(products)    
    }

    async getProductByCode(req: Request, res: Response) {
        const code = req.params['code']
        const product = await this.service.getProductByCode(code)

        if (!!product)
            return res.status(200).json(product)
        
        return res.status(404).json({ message: 'product not found'})
    }

    async activeProduct(req: Request, res: Response) {
        const code = req.params['code']

        try {
            await this.service.activateOrDeactivateProduct(code, true)
            return res.status(200).json({ message: 'product has been activated'})

        } catch (error: any) {
            return res.status(404).json({ message: error.message })            
        }        
    }

    async deactivateProduct(req: Request, res: Response) {
        const code = req.params['code']

        try {
            await this.service.activateOrDeactivateProduct(code, false)
            return res.status(200).json({ message: 'product has been deactivated'})

        } catch (error: any) {
            return res.status(404).json({ message: error.message })            
        }        
    }

    async createProduct(req: Request, res: Response) {
        try {
            const product:ProductRequestDTO = req.body
            await this.service.createProduct(product)
            return res.status(201).json()
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }

    async updateProduct(req: Request, res: Response) {
        
        try {
            const code = req.params.code
            const product: ProductRequestDTO = req.body
            await this.service.updateProduct(code, product)
            return res.status(204).json()
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }

    async deleteProductByCode(req: Request, res: Response) {
        try {
            const code = req.params['code']
            await this.service.deleteProduct(code)
            return res.status(200).json({ message: 'product has been deleted'})

        } catch (error: any) {
            let httpStatus = 400
            if (error.message.includes('not found')) {httpStatus = 404}
            return res.status(400).json({ message: error.message })            
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories =  await this.service.getAllCategories()
            return res.status(200).json(categories)
        
        } catch (error: any) {
            return res.status(500).json({ message: error.message })                        
        }
    }

}

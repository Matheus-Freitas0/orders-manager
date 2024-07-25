import { Request, Response } from "express";
import { Product } from "../models/product";
import { ProductRepository } from "../repositories/product.repository";
import { DatasourceConfig } from "../config/datasource.config";

const datasource = new DatasourceConfig()
const productRepository = new ProductRepository(datasource)

export class ProductController {
    
    async getProducts(req: Request, res: Response){
        const products = await productRepository.getProducts()
        return res.status(200).json(products);
    }

    async getProductByCode(req: Request, res: Response){
        
        const code = req.params['code']
        const product = await productRepository.getProductByCode(code)

        if(!!product)
            return res.status(200).json(product)
        
         return res.status(404).json({message : 'product not found'})
    }
    
    async activeProductByCode(req: Request, res: Response){
        const code = req.params['code']

        try{
            await productRepository.activateOrDeactivateProduct(code,true)
            return res.status(200).json({message : 'product activated'})
        }
        catch(error:any){
                return res.status(404).json({message : error.message})
        }
    }

    async deactivateProductByCode(req: Request, res: Response){
        const code = req.params['code']

        try{
            await productRepository.activateOrDeactivateProduct(code,false)
            return res.status(200).json({message : 'product activated'})
        }
        catch(error:any){
                return res.status(404).json({message : error.message})
        }
    }
    
    async createProduct(req: Request, res: Response) {
        try {
            const product = Product.createProduct(req.body)
            await productRepository.createProduct(product)
            return res.status(201).json()
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }
    
    async updateProduct(req: Request, res: Response) {
        const body = req.body
        const code = req.params['code']

        try {
            await productRepository.updateProduct(code, body)
            return res.status(204).json()
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }


    async deleteProductByCode(req: Request, res: Response){
        const code = req.params['code']
        try{
            await productRepository.deleteProduct(code)
            return res.status(200).json({message : 'product deleted'})
        }
        catch(error:any){
            return res.status(404).json({message : error.message})
        }
    }
    
}

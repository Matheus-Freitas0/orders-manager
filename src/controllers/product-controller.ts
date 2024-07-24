import { Request, Response } from "express";
import { Product } from "../models/product";

const products: Product[] = [
    new Product("xyz789", "teclado logitech", 100, 20, true),
    new Product("abc123", "mouse Razer", 150, 30, false),
    new Product("def456", "monitor Samsung", 1200, 10, true),
    new Product("ghi789", "cadeira gamer DXRacer", 900, 5, false),
    new Product("jkl012", "headset HyperX", 250, 25, true),
    new Product("mno345", "webcam Logitech", 300, 15, true),
    new Product("pqr678", "notebook Dell", 3500, 8, false),
    new Product("stu901", "mesa para computador", 400, 10, true),
    new Product("vwx234", "impressora HP", 800, 12, false),
    new Product("yzA567", "SSD Kingston 1TB", 500, 20, true)
];

function getProduct(req: Request): any {
    const productCode = req.params.code
    return products.find(item => item.getCode() === productCode);
}

export class ProductController {
    
    getProducts(req: Request, res: Response) {
        return res.status(200).json(products);
    }

    getProductByCode(req: Request, res: Response){
        const product = getProduct(req)
        
        if(!!product)
            return res.status(200).json(product);
        
         return res.status(404).json({message : 'product not found'});
    }
    
    activeProductByCode(req: Request, res: Response){
        const product = getProduct(req)

        if(!!product){
            product.setActive(true)
            return res.status(200).json(product);
        }
        return res.status(404).json({message : 'product not found'});
    }
    
    deactivateProductByCode(req: Request, res: Response){
        const product = getProduct(req)

        if(!!product){
            product.setActive(false)
            return res.status(200).json(product);
        }
        return res.status(404).json({message : 'product not found'});
    }
    
    createProduct(req: Request, res: Response){
        try{
        const product = Product.createProduct(req.body);
        products.push(product);
        return res.status(201).json(product);
        }
        catch(error:any){
            return res.status(400).json({message : error.message});
        }
    }
    
    updateProduct(req: Request, res: Response){
        const product = getProduct(req)
        
        if(!!product){
            product.updateProduct(req.body)
            return res.status(204).json(product);
        }
        return res.status(404).json({message : 'product not found'});
    }

    deleteProductByCode(req: Request, res: Response){
        const product = getProduct(req)
    
        if(!!product){
            products.splice(products.indexOf(product), 1)
            return res.status(204).json(product);
        }
        return res.status(404).json({message : 'product not found'});
    }
    
}

import { Request, Response } from "express";
import { Product } from "../models/product";

const products: Product[] = [
    {"code": "xyz789", "name": "teclado logitech", "value": 100, "stock": 20},
    {"code": "123abc", "name": "mouse microsoft", "value": 50, "stock": 30},
    {"code": "def456", "name": "monitor samsung", "value": 1500, "stock": 10},
    {"code": "456def", "name": "impressora hp", "value": 400, "stock": 15},
    {"code": "ijk789", "name": "fone de ouvido sony", "value": 200, "stock": 25},
    {"code": "mno123", "name": "cadeira gamer", "value": 800, "stock": 5},
    {"code": "pqr456", "name": "tablet lenovo", "value": 600, "stock": 8},
    {"code": "789pqr", "name": "smartphone apple", "value": 4000, "stock": 12},
    {"code": "uvw123", "name": "SSD Kingston 1TB", "value": 250, "stock": 18},
    {"code": "123uvw", "name": "rotação de 360 graus", "value": 350, "stock":10}
];

export class ProductController {
    
    getProducts(req: Request, res: Response) {
        return res.status(200).json(products);
    }
}

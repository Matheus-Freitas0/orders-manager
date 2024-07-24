import express from 'express'
import { Router } from 'express-serve-static-core'
import { ProductController } from '../controllers/product-controller'

const router: Router = express.Router()
const Controller = new ProductController()

router.get("/", Controller.getProducts)
router.get("/:code", Controller.getProductByCode)
router.patch("/:code/active", Controller.activeProductByCode)
router.patch("/:code/deactivate", Controller.deactivateProductByCode)
router.post("/" , Controller.createProduct)
router.put("/:code", Controller.updateProduct)
router.delete("/:code", Controller.deleteProductByCode)
        
export default router
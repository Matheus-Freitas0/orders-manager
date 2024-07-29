import express from 'express'
import { Router } from 'express-serve-static-core'
import { ProductController } from '../controllers/product.controller'

const router: Router = express.Router()
const controller = new ProductController()

router.get('/', controller.getProducts)
router.get('/categories', controller.getCategories)
router.get('/:code', controller.getProductByCode)
router.put('/:code', controller.updateProduct)
router.patch('/:code/active', controller.activeProduct)
router.patch('/:code/deactivate', controller.deactivateProduct)
router.post('/', controller.createProduct)
router.delete('/:code', controller.deleteProductByCode)

export default router

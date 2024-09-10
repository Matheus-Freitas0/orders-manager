import express from 'express'
import { Router } from 'express-serve-static-core'
import { OrderController } from '../controllers/order.controller'

const router: Router = express.Router()
const controller = new OrderController()

router.post('/', controller.create)
router.put('/:code', controller.updateOrder)
router.get('/:code', controller.getByCode)
router.get('/', controller.getAll)

export default router
import express from 'express'
import { Router } from 'express-serve-static-core'
import { OrderController } from '../controllers/order.controller'

const router: Router = express.Router()
const controller = new OrderController()

router.post('/', controller.create)

export default router
import express from 'express'
import { Router } from 'express-serve-static-core'
import { CustomerController } from '../controllers/customer.controller'

const router: Router = express.Router()
const controller = new CustomerController()

router.post('/', controller.create)
router.get('/:document', controller.getByDocument)

export default router
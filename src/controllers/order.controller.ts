import { Request, Response } from 'express'
import { Inject } from '../config/container.config'
import { OrderService } from '../services/order.service'

export class OrderController {

    @Inject('orderSvc')
    private service!: OrderService

    constructor () {
        this.create = this.create.bind(this)
    }

    async create(req: Request, res: Response) {
        try {
            const orderCode = await this.service.create(req.body)
            res.status(201).json({ orderCode })
        } catch (error: any) {     
            let errors
            try {
                errors = JSON.parse(error.message)
            } catch (parseError) {
                errors = { message: error.message }
            }
            res.status(400).json(errors)
        }
    }
}

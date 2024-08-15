import { Request, Response } from 'express'
import { Inject } from '../config/container.config'
import { OrderService } from '../services/order.service'
import { Order } from '../models/order'

export class OrderController {

    @Inject('orderSvc')
    private service!: OrderService

    constructor () {
        this.create = this.create.bind(this)
        this.getByCode = this.getByCode.bind(this)
    }

    async create(req: Request, res: Response) {
        try {
            const orderCode = await this.service.create(req.body)
            res.status(201).json({ orderCode })
            
        } catch (error: any) {
            const errors = JSON.parse(error.message)
            res.status(400).json(errors)
        }
    }

    async getByCode(req: Request, res: Response) {
        try {
            const code = req.params.code
            const order = await this.service.getByCode(code)
            res.status(200).json(order)
            
        } catch (error: any) {
            const errors = JSON.parse(error.message)
            res.status(400).json(errors)            
        }
    }

    async updateOrder(req: Request, res: Response){
        try {
            const code = req.params.code
            const order: Order = req.body
            await this.service.updateOrder(code, order)
            return res.status(204).json()
        
        } catch (error: any) {
            return res.status(400).json({ message: error.message})
        }
    }
}

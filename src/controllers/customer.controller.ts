import { Request, Response } from 'express'
import { Customer } from '../models/customer'
import { CustomerService } from '../services/customer.service'
import { Inject } from '../config/container.config'

export class CustomerController {

    @Inject('customerSvc') service!: CustomerService

    constructor () {
        this.create = this.create.bind(this)
        this.getByDocument = this.getByDocument.bind(this)
    }

    async create (req: Request, res: Response) {
        try {
            const bodyRequest: Customer = req.body
            bodyRequest.document = bodyRequest.document.replace(/\D/g, '')
            const customer = await this.service.create(bodyRequest)
            return res.status(201).json(customer)

        } catch (error: any) {
            if (!!error.message) {
                return res.status(400).json({ message: error.message})            
            }

            const message = error.errors[0]
            return res.status(500).json({ message }) 
        }
    }

    async getByDocument (req: Request, res: Response) {
        try {
            const customer = await this.service.getByDocument(req.params.document)
            return res.status(200).json(customer)

        } catch (error: any) {
            if (error.message.includes('not found')){
                return res.status(404).json({ message: error.message})
            }
            return res.status(500).json({ message: error.message })  
        }
    }

}
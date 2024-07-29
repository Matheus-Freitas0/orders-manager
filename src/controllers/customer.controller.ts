import { Request, Response } from 'express'
import { DatasourceConfig } from '../config/datasource.config'
import { CustomerRepository } from '../repositories/customer.repository'
import { Customer } from '../models/customer'
import axios from 'axios'

export class CustomerController {

    repository: CustomerRepository

    constructor () {
        const datasource = new DatasourceConfig()
        this.repository = new CustomerRepository(datasource)

        this.create = this.create.bind(this)
        this.getByDocument = this.getByDocument.bind(this)
    }

    async create (req: Request, res: Response) {
        try {
            const body = req.body as Customer
            const cusValidatorURL = "http://localhost:3030/customer-validator/document?"
            const response = await axios.get(`${cusValidatorURL}document=${body.document}`)
            const isDocumentValid = (response.data as { isValid: boolean }).isValid;            
            console.log(isDocumentValid);
            
            if (!isDocumentValid) {
                return res.status(400).json({ message: 'document is not valid'})
            }
        
            const customer: Customer = await this.repository.create(body)
            return res.status(201).json(customer)
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message})            
        }
    }

    async getByDocument (req: Request, res: Response) {
        try {
            const document = req.params.document
            const customer: Customer = await this.repository.getByDocument(document)
            return res.status(200).json(customer)    

        } catch (error: any) {
            return res.status(500).json({ message: error.message })  
        }
    }
    
}
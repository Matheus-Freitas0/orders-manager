import { Customer } from './../../models/customer';
import { OrderValidatorClient } from '../../clients/order-validator.client'
import { Inject } from '../../config/container.config'
import { CustomerRepository } from '../../repositories/customer.repository'
import { CustomerService } from '../customer.service'

export class CustomerServiceImpl implements CustomerService {

    @Inject('customerRepo') repository!: CustomerRepository
    @Inject('orderValCli') orderValidatorClient!: OrderValidatorClient 

    async create (customerReqBody: Customer): Promise<Customer> {
        const response: any = await this.orderValidatorClient.customerDocumentValidator(customerReqBody.document)
        if (!response.isValid) throw new Error('document is not valid')
        return await this.repository.create(customerReqBody) as Customer
    }

    async getByDocument(document: string): Promise<Customer> {
        const customer: any = await this.repository.getByDocument(document)
        if (!customer) throw new Error('document not found')
        return await customer
    }

}
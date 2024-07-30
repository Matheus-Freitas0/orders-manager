import { OrderValidatorClientImpl } from '../../clients/impl/order-validator-client.impl'
import { OrderValidatorClient } from '../../clients/order-validator.client'
import { Customer } from '../../models/customer'
import { CustomerRepository } from '../../repositories/customer.repository'
import { CustomerRepositoryImpl } from '../../repositories/impl/customer-repository.impl'
import { CustomerService } from '../customer.service'

export class CustomerServiceImpl implements CustomerService {

    repository: CustomerRepository
    orderValidatorClient: OrderValidatorClient
    
    constructor() {
        this.repository = new CustomerRepositoryImpl()
        this.orderValidatorClient = new OrderValidatorClientImpl()
    }

    async create(customerReqBody: Customer): Promise<Customer> {
        const response = await this.orderValidatorClient.customerDocumentValidator(customerReqBody.document)
        if (!response.isValid) throw new Error('document is not valid')
            return await this.repository.create(customerReqBody)
    }

    async getByDocument(document: string): Promise<Customer> {
        return await this.repository.getByDocument(document)
    }
}

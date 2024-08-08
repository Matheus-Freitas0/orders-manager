import { Repository } from '../repository'
import { Customer } from '../../models/customer'
import { CustomerRepository } from '../customer.repository'
import queries from '../../../files/queries/customers-queries.json'

export class CustomerRepositoryImpl extends Repository implements CustomerRepository {

    async create (customer: Customer): Promise<Customer> {
        await this.datasource.query(queries.create, customer.name, customer.document)
        return await this.getByDocument(customer.document)
    }

    async getByDocument (document: string): Promise<Customer> {
        const data = await this.datasource.query(queries.getByDocument, document)
        const resultSet = data[0] as Customer[]
        return resultSet[0] as Customer        
    }

}
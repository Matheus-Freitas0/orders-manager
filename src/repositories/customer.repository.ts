import { Customer } from '../models/customer'

export interface CustomerRepository {

    create (customer: Customer): Promise<Customer> 
    getByDocument (document: string): Promise<Customer>

}
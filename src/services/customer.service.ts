import { Customer } from "../models/customer"

export interface CustomerService {
    
    create (customer: Customer): Promise<Customer> 
    getByDocument (document: string): Promise<Customer>

}
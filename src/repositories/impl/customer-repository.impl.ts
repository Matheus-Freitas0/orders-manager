import { CustomerRepository } from "../customer.repository";
import { Repository } from "../repository";
import { Customer } from "../../models/customer";
import queries from "../../../files/customers-queries.json"
import { DatasourceConfig } from "../../config/datasource.config";

export class CustomerRepositoryImpl extends Repository implements CustomerRepository{
    
    constructor(){
        super(new DatasourceConfig())
    }

    async create (customer: Customer): Promise<Customer> {
        const conn = await this.datasource.connection.getConnection() 
        await conn.query(queries.create, [customer.name, customer.document])
        return await this.getByDocument(customer.document)
    }

    async getByDocument(document: string): Promise<Customer> {
        const conn = await this.datasource.connection.getConnection()
        const data = await conn.query(queries.getByDocument,[document])
        const resultSet = data[0] as Customer[]
        return resultSet[0] as Customer
    }
}
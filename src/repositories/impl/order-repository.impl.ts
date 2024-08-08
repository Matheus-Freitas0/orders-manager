import { Order } from '../../models/order'
import { OrderRepository } from '../order.repository'
import { Repository } from '../repository'
import queries from '../../../files/queries/orders-queries.json'

export class OrderRepositoryImpl extends Repository implements OrderRepository {

    async create(order: Order): Promise<string> {
        await this.datasource.query(queries.create, order.code , order.customerId)
        const orderSaved = await this.getByCode(order.code)
        return orderSaved as any
    }

    async getByCode(code:string): Promise<Order>{
        const result = await this.datasource.query(queries.getByCode, code)
        const resultSet = result[0] 
        return resultSet 

    }



}
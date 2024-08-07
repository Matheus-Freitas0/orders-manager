import { Order } from '../../models/order'
import { OrderRepository } from '../order.repository'
import { Repository } from '../repository'
import queries from '../../../files/order-queries.json'

export class OrderRepositoryImpl extends Repository implements OrderRepository {

    async create(order: Order): Promise<string> {
        await this.datasource.query(queries.create, order.code , order.customerId)
        return await this.getByOrder(order.code)
    }

    async getByOrder(code:string): Promise<string>{
        const result = await this.datasource.query(queries.getByOrder, code)
        const resultSet = result[0] 
        return resultSet 

    }



}